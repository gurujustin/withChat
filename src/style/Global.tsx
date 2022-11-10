import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
  
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .top-side-bar img {
    display: block;
    width: 100%;
    height: calc(100% - 2px);
    border-radius: 10px;
    object-fit: cover;
  }

  .img-slider-box .swiper-pagination-bullet {
    background: rgb(66, 66, 66);
    width: 14px;
    height: 14px;
  }

  .top-side-bar .swiper-pagination-bullet {
    border: 2px solid #1d1c22;
    height: 1rem;
    width: 1rem;
    background: #1d1c22;
    margin: 0 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    position: relative;
  }

  .top-side-bar .swiper-pagination-bullet::after {
    background: #1d1c22;
    border-radius: 4px;
    content: "";
    height: 0.5rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 0.5rem;
  }

  .top-side-bar .swiper-pagination-bullet-active {
    background: #ff7e94;
  }

  .top-side-bar .swiper-button-prev::after, .top-side-bar .swiper-button-next::after {
    font-size: 1.1875em;
    color: #ff7e94;
  }

  .top-side-bar {
    border-radius: 4px;   
  }

  .top-side-bar .swiper-button-prev, .top-side-bar .swiper-button-next {
    background: #343040;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 4px;
    transition: background-color .15s ease-out;
    padding-bottom: 2px;
    padding-left: 4px;
    top: 50%;
  }

  .top-side-bar {
    max-width: 920px;
    border-radius: 10px;
  }
`

export default GlobalStyle
