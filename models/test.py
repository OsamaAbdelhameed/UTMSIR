
# import warnings
# warnings.filterwarnings('ignore')

try:
    from IPython import get_ipython
    # get_ipython().magic('clear')
    get_ipython().run_line_magic('reset', '-f')
except:
    pass 

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
# from sklearn.neighbors import KNeighborsClassifier

from sklearn.neural_network import MLPClassifier




from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score

X = pd.read_csv('./data.csv',header=None)       

Y = pd.read_csv('./labels.csv',header=None)                       # need to change for other dataset

print(X.shape)
print(Y.shape)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.30)
X_train.shape, X_test.shape, Y_train.shape, Y_test.shape

Accuracy_all = []
Recall_all = []
Precision_all = []
F1_Score_all = []

#%% SVM
svc_classifier = SVC(kernel="linear")

svc_classifier.fit(X_train,Y_train.values.ravel())
y_test_pred = svc_classifier.predict(X_test)

xx = classification_report(Y_test, y_test_pred, output_dict=True)


Accuracy_all.append(xx['accuracy'])
print(Accuracy_all)
# Recall_all.append(xx['weighted avg']['recall'])
# Precision_all.append(xx['weighted avg']['precision'])
# F1_Score_all.append(xx['weighted avg']['f1-score'])

#%% LR
LR_model = LogisticRegression(random_state=0, solver='liblinear', max_iter=100)

LR_model.fit(X_train,Y_train.values.ravel())

y_test_pred = LR_model.predict(X_test)


xx = classification_report(Y_test, y_test_pred, output_dict=True)

Accuracy_all.append(xx['accuracy'])
print(Accuracy_all)

#%% train DT classifier


model_tree = DecisionTreeClassifier(max_leaf_nodes=8, class_weight='balanced')
model_tree.fit(X_train, Y_train)
 
y_train_pred = model_tree.predict(X_train)
y_test_pred = model_tree.predict(X_test)


xx = classification_report(Y_test, y_test_pred, output_dict=True)

Accuracy_all.append(xx['accuracy'])
print(Accuracy_all)
#%% Neural Network

NN_model = MLPClassifier(solver='adam', alpha=1e-3,max_iter = 1000,random_state=0, hidden_layer_sizes=150)
NN_model.fit(X_train,Y_train.values.ravel())

y_test_pred = NN_model.predict(X_test)
xx = classification_report(Y_test, y_test_pred, output_dict=True)


Accuracy_all.append(xx['accuracy'])
print(Accuracy_all)
