import React from "react";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
	return (
		<footer>
			<p>
				© 2023 <a href="utm.my">UTM</a>, School of Computing. All Rights
				Reserved.
			</p>
			<ul>
				<li>
					<a href="https://www.facebook.com/osama.abdelhameed.5243">
						<FaFacebook />
					</a>
				</li>
				<li>
					<a href="http://wa.me/+60163594056">
						<FaWhatsapp />
					</a>
				</li>
				<li>
					<a href="https://github.com/OsamaAbdelhameed">
						<FaGithub />
					</a>
				</li>
				<li>
					<a href="#https://www.linkedin.com/in/osama-abdelhameed/">
						<FaLinkedin />
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
