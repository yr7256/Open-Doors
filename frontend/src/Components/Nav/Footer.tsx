import React from 'react';
import Recomendation from '../../assets/img/recomendation.png';
import Bookmark from '../../assets/img/Bookmark.png';
import Transportation from '../../assets/img/transportation.png';
import My from '../../assets/img/My.png';
import { FooterBlock, FooterPlace } from '../../styles/Nav/FooterStyle';
import { Image, FooterP, Line } from '../../styles/Profile/MyPagestyle';

function Footer() {
	return (
		<>
			<FooterPlace>
				<Line />
				<FooterBlock>
					<div className="grid grid-cols-16 gap-1">
						<div className="col-start-2 col-span-2">
							<Image src={Recomendation} />
							<FooterP>추천</FooterP>
						</div>
						<div className="col-start-4 col-span-2">
							<Image src={Bookmark} />
							<FooterP>즐겨찾기</FooterP>
						</div>
						<div className="col-start-6 col-span-2">
							<Image src={Transportation} />
							<FooterP>교통정보</FooterP>
						</div>
						<div className="col-start-8 col-span-2">
							<Image src={My} />
							<FooterP>MY</FooterP>
						</div>
					</div>
				</FooterBlock>
			</FooterPlace>
		</>
	);
}

export default Footer;
