const { Mates } = require("../models/matesRecommend");

const createMates = async(req, res) => {
    if (req.user.role !== 's')
        return res.status(400).send({ message: 'Students only are allowed to create Mates recommendations' });

    let newMate = {...req.body, owner: req.user.id };
    console.log(newMate)
    let allMates = []

    await Mates.updateMany({ owner: newMate.owner }, { state: 'old' })

    await Mates.find()
        .populate('owner', '').then(all => {
            all.forEach(mate => {
                if (mate.owner === newMate.owner)
                    return;
                let attributes = {}
                let similarity = 0;
                if (newMate.sameReligion)
                    attributes.religion = mate.religion;
                if (newMate.field)
                    attributes.field = mate.owner.field;
                console.log('done correctly')
                attributes = {...attributes, vaping: mate.vaping, smoking: mate.smoking, budget: mate.expectedBudget, lang: mate.lang, myBudget: mate.myBudget }
                const score = (attributes.religion == newMate.religion) + (attributes.field == newMate.field) + (attributes.vaping == newMate.vaping) + (attributes.smoking == newMate.smoking) + (attributes.budget <= newMate.myBudget) + (attributes.myBudget >= newMate.expectedBudget) + (attributes.lang.filter(value => newMate.lang.includes(value)).length)
                console.log(score)
                similarity = score / Object.keys(attributes).length;
                console.log(similarity)
                allMates.push({ student: mate.owner._id, similarity, attributes })
                allMates.sort((a, b) => a.similarity + b.similarity);
                console.log(allMates)
            })
        })
        .catch((err) => res.status(500).send({ message: "error in existing mates." }));

    const mate = new Mates({...newMate, options: allMates.length > 3 ? allMates.slice(0, 3) : allMates });

    return await mate
        .save()
        .then((r) => res.status(200).send({ r, message: 'Mates created successfully' }))
        .catch((err) => res.status(500).send({ message: err.message }));
}

const updateMates = async(req, res) => {
    const id = req.params.id;
    try {
        const mates = await Mates.findById(id);
        if (req.user.id != mates.owner)
            return res.status(500).send({ message: "You aren't the owner of this Mates recommendations" })
        return mates
            .set(req.body)
            .save()
            .then((m) => res.status(200).json({ m }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAllMates = async(req, res) => {
    return await Mates.find()
        .populate('owner', '')
        .populate('feedback', '')
        .then((m) => {
            console.log(m)
            if (req.user.role === 's')
                m = [...m.filter(m => m.owner._id == req.user.id)]
            console.log(m)
            res.status(200).json({ rooms: req.rooms, mates: m })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err })
        });
}

const deleteMates = async(req, res) => {
    try {
        const { id } = req.params;
        const m = await Mates.findById(id);

        if (req.user.role !== 'a' && req.user.id !== m.owner)
            return res.status(400).send({ message: "You need to be an admin or request's owner" });
        if (req.user.role === 's' && req.user.id !== m.owner)
            return res.status(400).send({ message: "Users aren't allowed to delete other users' requests" });

        return m.deleteOne({ _id: id })
            .then((m) => res.status(200).json({ m }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { createMates, updateMates, getAllMates, deleteMates }