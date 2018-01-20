import angularImgUrl from '../assets/angular.png';
import d3ImgUrl from '../assets/d3.png';
import jenkinsImgUrl from '../assets/jenkins.png';
import postCssImgUrl from '../assets/postcss.png';
import reactImgUrl from '../assets/react.png';
import reduxImgUrl from '../assets/redux.png';
import sassImgUrl from '../assets/sass.png';
import superchargeImgUrl from '../assets/supercharge.png';
import tsImgUrl from '../assets/ts.png';
import webpackImgUrl from '../assets/webpack.png';

export const CARD_IMAGES = [
  angularImgUrl,
  d3ImgUrl,
  jenkinsImgUrl,
  postCssImgUrl,
  reactImgUrl,
  reduxImgUrl,
  sassImgUrl,
  superchargeImgUrl,
  tsImgUrl,
  webpackImgUrl
];

export function randomCardImageId() {
  return (Math.random() * CARD_IMAGES.length) | 0;
}

export function cardImageUrl(id) {
  return CARD_IMAGES[id];
}
