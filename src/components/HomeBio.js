import React, {Component} from 'react'


class HomeBio extends Component {
  render() {
    return (
      <React.Fragment>
      <section className="has-divider bg-primary-alt">
    <div className="divider flip-y">
      <svg width="100%" height="96px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">
        <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z"></path>
      </svg>
    </div>
    <div className="container"> {/*data-aos="fade-up"*/}
      <div className="row align-items-center justify-content-around">
        <div className="col-md-5">
          <img src="https://avatars1.githubusercontent.com/u/892860?s=460&v=4" alt="Image" className="rounded-circle layer-2"/>
          <div className="decoration bottom left"> {/*data-aos="fade-up"*/}
            <svg className="bg-primary" width="260" height="160" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.455 70.69C259.549 81.425 258.285 91.476 256.723 101.5C255.75 107.739 254.741 113.973 253.793 120.216C253.272 123.658 253.016 127.152 252.309 130.553C251.914 132.455 251.061 134.358 250.02 136.01C248.553 138.334 247.721 140.777 247.452 143.469C247.352 144.46 247.276 145.469 247.018 146.424C246.094 149.85 243.805 151.926 240.278 152.031C236.299 152.15 232.272 152.2 228.331 151.733C214.925 150.144 201.481 149.879 188.015 150.246C184.869 150.332 181.734 150.853 178.599 151.223C174.31 151.728 170.035 152.36 165.74 152.791C160.949 153.271 156.142 153.861 151.34 153.896C147.037 153.929 142.729 153.304 138.428 152.913C135.616 152.658 132.78 152.482 130.014 151.954C124.705 150.94 119.436 151.424 114.147 151.932C113.485 151.995 112.819 152.092 112.159 152.068C102.048 151.707 92.3718 154.415 82.6568 156.532C74.1448 158.387 65.6488 159.497 56.9518 159.12C52.1158 158.911 47.8618 157.293 44.2628 154.038C40.3218 150.473 36.4308 146.852 32.4598 143.319C30.8488 141.886 29.1588 140.514 27.3758 139.307C23.4348 136.64 20.4418 133.227 18.0988 129.069C13.3288 120.618 9.20281 111.955 7.65781 102.262C7.55381 101.607 7.3958 100.957 7.2298 100.314C6.1908 96.293 5.2378 92.248 4.0778 88.262C2.2148 81.85 0.571797 75.405 0.979797 68.658C1.1498 65.853 1.55581 63.055 2.00681 60.279C2.29981 58.48 2.8018 56.705 3.3248 54.954C5.7158 46.961 7.0748 38.773 7.8858 30.494C8.3918 25.32 9.60281 20.381 11.6968 15.613C13.3508 11.846 15.7128 8.84097 19.1968 6.55897C27.8848 0.871973 37.1478 -0.681028 47.3118 1.48997C53.8668 2.88997 60.0558 5.23799 66.3218 7.44499C74.3058 10.257 82.4408 11.128 90.8688 9.80897C98.7418 8.57597 106.65 7.36398 114.59 6.78898C123.358 6.15498 132.18 5.75698 140.926 7.59398C151.371 9.78798 161.944 10.817 172.633 10.495C175.623 10.405 178.623 10.56 181.613 10.447C193.99 9.97397 205.607 13.012 217.019 17.532C223.023 19.909 228.191 23.388 233.035 27.467C237.988 31.636 242.894 35.872 247.654 40.258C249.588 42.039 251.371 44.124 252.716 46.373C254.845 49.931 256.62 53.71 258.413 57.458C259.815 60.395 259.61 63.625 259.684 66.771C259.717 68.261 259.514 69.757 259.455 70.69ZM188.312 109.787L188.011 109.598L187.966 109.906L188.312 109.787Z"
              fill="black" />
            </svg>

          </div>
          <div className="decoration bottom left"> {/*data-aos="fade-right"*/}
            <svg className="bg-primary-2" width="177" height="40" viewBox="0 0 177 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M176.123 39.7359C175.478 39.7539 174.855 39.8269 174.242 39.7769C170.656 39.4889 167.072 39.1749 163.49 38.8589C163.013 38.8179 162.523 38.7829 162.074 38.6339C159.541 37.7899 156.908 37.6619 154.277 37.4949C151.484 37.3189 148.693 37.1279 145.904 36.9159C137.927 36.3109 129.935 36.1449 121.943 35.9849C118.191 35.9109 114.437 35.8699 110.683 35.8189C102.611 35.7079 94.5379 35.6229 86.4659 35.4789C82.5519 35.4109 78.6399 35.2639 74.7279 35.0959C71.1379 34.9419 67.5439 34.7819 63.9619 34.4979C60.3799 34.2139 56.8099 33.7729 53.2349 33.4039C51.0919 33.1829 48.9479 32.9899 46.8089 32.7499C42.6819 32.2869 38.5469 31.8829 34.4379 31.2949C30.8849 30.7849 27.3699 30.0239 23.8269 29.4309C20.5199 28.8769 17.1999 28.3969 13.8859 27.8889C11.3609 27.4999 8.83285 27.1369 6.31185 26.7229C5.20285 26.5409 4.11485 26.3279 2.99585 26.6609C2.29285 26.8699 1.78286 26.5279 1.31986 26.0139C0.505856 25.1049 0.385845 24.0069 0.436845 22.8759C0.461845 22.3359 0.838856 21.9889 1.37586 21.9639C1.93086 21.9399 2.49286 21.9869 3.04586 22.0559C6.45786 22.4729 9.86185 22.9469 13.2759 23.3229C20.2719 24.0939 27.1859 25.3849 34.1159 26.5539C38.4599 27.2879 42.8209 27.7809 47.1899 28.2399C52.3519 28.7829 57.5399 29.0959 62.6979 29.6599C70.4149 30.5039 78.1509 30.8669 85.9049 30.9709C91.2549 31.0409 96.6079 30.9939 101.958 31.0969C110.19 31.2539 118.419 31.5019 126.651 31.6919C129.368 31.7549 132.09 31.6799 134.805 31.7969C140.793 32.0589 146.785 32.3089 152.764 32.7369C158.817 33.1709 164.856 33.7929 170.897 34.3809C172.083 34.4959 173.258 34.7829 174.413 35.0909C174.829 35.2019 175.374 35.5309 175.505 35.8909C175.936 37.0619 176.463 38.2559 176.123 39.7359Z"
              fill="black" />
              <path d="M8.59619 2.86295C9.31119 2.68995 9.8322 2.44794 10.3482 2.45994C12.0262 2.50094 13.7002 2.61996 15.3752 2.73396C18.9572 2.97896 22.5372 3.38394 26.1252 3.46394C34.9862 3.66194 43.8482 4.19895 52.7172 3.69795C56.8622 3.46395 61.0102 3.29694 65.1562 3.11594C67.5492 3.01194 69.9432 2.94496 72.3382 2.85896C72.9772 2.83596 73.6172 2.83496 74.2542 2.77296C79.5842 2.25296 84.9402 2.22594 90.2852 1.97794C94.1152 1.79894 97.9432 1.54695 101.773 1.40995C106.324 1.24595 110.878 1.03995 115.427 1.08195C126.302 1.18295 137.167 0.948947 148.034 0.624947C152.343 0.496947 156.663 0.595932 160.975 0.665932C162.409 0.688932 163.836 0.932932 165.266 1.09693C166.348 1.22193 167.248 1.73193 167.893 2.59693C168.588 3.52993 169.555 4.32993 169.649 5.80393C169.17 5.89993 168.731 6.08594 168.307 6.05494C166 5.88594 163.702 5.60994 161.395 5.47794C159.723 5.38294 158.04 5.41296 156.362 5.46296C151.022 5.62196 145.682 5.83394 140.342 5.98594C138.186 6.04794 136.028 6.00095 133.869 6.01395C131.715 6.02795 129.558 6.08295 127.404 6.07295C122.779 6.04895 118.152 5.89295 113.529 5.97895C108.021 6.08195 102.519 6.37894 97.0132 6.59394C95.5832 6.64994 94.1542 6.69794 92.7262 6.77094C89.8612 6.91894 86.9942 7.07094 84.1302 7.24494C81.2592 7.41894 78.3923 7.63895 75.5232 7.80695C72.4962 7.98495 69.4641 8.10595 66.4391 8.28895C63.4141 8.47195 60.3922 8.73296 57.3672 8.90296C50.7422 9.27496 44.1111 9.18295 37.4821 9.08695C35.1731 9.05395 32.8751 8.75994 30.5681 8.62794C25.3981 8.32994 20.2342 7.82095 15.0912 7.19495C13.5952 7.01295 12.1141 6.83094 10.6111 6.80994C9.65219 6.79594 9.0642 6.40194 8.8842 5.53394C8.7292 4.76394 8.70919 3.96395 8.59619 2.86295Z"
              fill="black" />
            </svg>

          </div>
        </div>
        <div className="col-xl-5 col-md-6">
          <div className="h1">
            <div>Howdy, I'm Joe,</div>
            <span>A</span>
            <div className="highlight">
              <span data-typed-text data-loop="true" data-type-speed="65" data-strings='["visual designer","front-end developer","product creator","restless maker"]'></span>
            </div>
          </div>
          <p className="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
          <a href="#" className="lead">@joethedesigner</a>
        </div>
      </div>
    </div>
  </section>
      </React.Fragment>
    );
  }
}

export default HomeBio;