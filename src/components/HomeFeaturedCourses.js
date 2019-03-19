import React, {Component} from 'react'
import CourseCard from './CourseCard.js'
import CardDeck from 'react-bootstrap/CardDeck';

class HomeFeaturedCourses extends Component {

  // componentDidMount = () => {
  //   // <script type="text/javascript" src="src/assets/js/theme.js"></script>
  //   const script = document.createElement("script");
  //     script.src = "/src/assets/js/theme.js";
  //     script.type = "text/javascript"
  //     script.async = true;
  //
  //     document.body.appendChild(script);
  // }

//   function() {
//   AOS.init();
// })

  render() {
    return (
      <React.Fragment>
      {/*<div className='section_container'>
      <h1>Featured Courses </h1>
      <CardDeck>
      {this.props.courses.slice(0,3).map(course => {
          return <CourseCard
          course={course}
          key={course.id}
        />}
      )}
      </CardDeck>
      </div>*/}


      <section>
    <div className="container">
      <div className="row justify-content-center text-center mb-5">
        <div className="col-xl-8 col-lg-9">
          <h2 className="display-4 mx-xl-6">What you'll learn</h2>
          <p className="lead">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
          </p>
        </div>
      </div>
      <div className="row justify-content-between align-items-center my-6">
        <div className="col-md-5 col-lg-6 mb-4 mb-md-0"> {/*data-aos="fade-right"*/}
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="card card-icon-3 card-body justify-content-between shadow-3d rotate-left">
                <div className="icon-round mb-3 mb-md-4 icon bg-primary">
                <div className="decoration">
                  <svg className="icon bg-primary" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>Icon For Color-profile</title>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect opacity="0" x="0" y="0" width="24" height="24"></rect>
                      <path d="M12,10.9996338 C12.8356605,10.3719448 13.8743941,10 15,10 C17.7614237,10 20,12.2385763 20,15 C20,17.7614237 17.7614237,20 15,20 C13.8743941,20 12.8356605,19.6280552 12,19.0003662 C11.1643395,19.6280552 10.1256059,20 9,20 C6.23857625,20 4,17.7614237 4,15 C4,12.2385763 6.23857625,10 9,10 C10.1256059,10 11.1643395,10.3719448 12,10.9996338 Z M13.3336047,12.504354 C13.757474,13.2388026 14,14.0910788 14,15 C14,15.9088933 13.7574889,16.761145 13.3336438,17.4955783 C13.8188886,17.8206693 14.3938466,18 15,18 C16.6568542,18 18,16.6568542 18,15 C18,13.3431458 16.6568542,12 15,12 C14.3930587,12 13.8175971,12.18044 13.3336047,12.504354 Z"
                      fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                      <circle fill="#000000" cx="12" cy="9" r="5"></circle>
                    </g>
                  </svg>
                  </div>
                </div>
                <span className="badge bg-primary text-light">3 Lessons</span>
                <div>
                  <h3>Color Theory</h3>
                  <p className="lead">
                    Accusantium doloremque laudantium, totam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6"> {/*data-aos="fade"*/}
          <h3 className="h1">Color Theory</h3>
          <p className="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
          <ul className="list-unstyled mb-0">
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary mr-2">
                <svg className="icon bg-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary mr-2">
                <svg className="icon bg-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 2:</span>Totam rem aperiam, eaque ipsa.</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary mr-2">
                <svg className="icon bg-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="row justify-content-between align-items-center my-6">
        <div className="col-md-5 col-lg-6 mb-4 mb-md-0"> {/*data-aos="fade-right"*/}
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="card card-icon-3 card-body justify-content-between shadow-3d rotate-left">
                <div className="icon-round mb-3 mb-md-4 icon bg-primary-2">
                  <svg className="icon bg-primary-2" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>Icon For Display#1</title>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect opacity="0" x="0" y="0" width="24" height="24"></rect>
                      <path d="M11,20 L11,17 C11,16.4477153 11.4477153,16 12,16 C12.5522847,16 13,16.4477153 13,17 L13,20 L15.5,20 C15.7761424,20 16,20.2238576 16,20.5 C16,20.7761424 15.7761424,21 15.5,21 L8.5,21 C8.22385763,21 8,20.7761424 8,20.5 C8,20.2238576 8.22385763,20 8.5,20 L11,20 Z"
                      fill="#000000" opacity="0.3"></path>
                      <path d="M3,5 L21,5 C21.5522847,5 22,5.44771525 22,6 L22,16 C22,16.5522847 21.5522847,17 21,17 L3,17 C2.44771525,17 2,16.5522847 2,16 L2,6 C2,5.44771525 2.44771525,5 3,5 Z M4.5,8 C4.22385763,8 4,8.22385763 4,8.5 C4,8.77614237 4.22385763,9 4.5,9 L13.5,9 C13.7761424,9 14,8.77614237 14,8.5 C14,8.22385763 13.7761424,8 13.5,8 L4.5,8 Z M4.5,10 C4.22385763,10 4,10.2238576 4,10.5 C4,10.7761424 4.22385763,11 4.5,11 L7.5,11 C7.77614237,11 8,10.7761424 8,10.5 C8,10.2238576 7.77614237,10 7.5,10 L4.5,10 Z"
                      fill="#000000"></path>
                    </g>
                  </svg>
                </div>
                <span className="badge bg-primary-2 text-light">4 Lessons</span>
                <div>
                  <h3>Screen Design</h3>
                  <p className="lead">
                    Accusantium doloremque laudantium, totam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">{/*data-aos="fade"*/}
          <h3 className="h1">Screen Design</h3>
          <p className="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
          <ul className="list-unstyled mb-0">
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-2 mr-2">
                <svg className="icon bg-primary-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 1:</span>Doloremque laudantium, totam error.</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-2 mr-2">
                <svg className="icon bg-primary-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 2:</span>Natus error sit voluptatem</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-2 mr-2">
                <svg className="icon bg-primary-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 3:</span>Totam rem aperiam, eaque ipsa.</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-2 mr-2">
                <svg className="icon bg-primary-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 4:</span>Accusantium doloremque laudantium, totam rem</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="row justify-content-between align-items-center my-6">
        <div className="col-md-5 col-lg-6 mb-4 mb-md-0">{/*data-aos="fade-right"*/}
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="card card-icon-3 card-body justify-content-between shadow-3d rotate-left">
                <div className="icon-round mb-3 mb-md-4 icon bg-primary-3">
                  <svg className="icon bg-primary-3" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>Icon For iPhone-X</title>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect opacity="0" x="0" y="0" width="24" height="24"></rect>
                      <path d="M8,2.5 C7.30964406,2.5 6.75,3.05964406 6.75,3.75 L6.75,20.25 C6.75,20.9403559 7.30964406,21.5 8,21.5 L16,21.5 C16.6903559,21.5 17.25,20.9403559 17.25,20.25 L17.25,3.75 C17.25,3.05964406 16.6903559,2.5 16,2.5 L8,2.5 Z" fill="#000000" opacity="0.3"></path>
                      <path d="M8,2.5 C7.30964406,2.5 6.75,3.05964406 6.75,3.75 L6.75,20.25 C6.75,20.9403559 7.30964406,21.5 8,21.5 L16,21.5 C16.6903559,21.5 17.25,20.9403559 17.25,20.25 L17.25,3.75 C17.25,3.05964406 16.6903559,2.5 16,2.5 L8,2.5 Z M8,1 L16,1 C17.5187831,1 18.75,2.23121694 18.75,3.75 L18.75,20.25 C18.75,21.7687831 17.5187831,23 16,23 L8,23 C6.48121694,23 5.25,21.7687831 5.25,20.25 L5.25,3.75 C5.25,2.23121694 6.48121694,1 8,1 Z M9.5,1.75 L14.5,1.75 C14.7761424,1.75 15,1.97385763 15,2.25 L15,3.25 C15,3.52614237 14.7761424,3.75 14.5,3.75 L9.5,3.75 C9.22385763,3.75 9,3.52614237 9,3.25 L9,2.25 C9,1.97385763 9.22385763,1.75 9.5,1.75 Z"
                      fill="#000000" fill-rule="nonzero"></path>
                    </g>
                  </svg>
                </div>
                <span className="badge bg-primary-3 text-light">4 Lessons</span>
                <div>
                  <h3>Responsive Design</h3>
                  <p className="lead">
                    Accusantium doloremque laudantium, totam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6"> {/*data-aos="fade"*/}
          <h3 className="h1">Responsive Design</h3>
          <p className="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
          <ul className="list-unstyled mb-0">
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-3 mr-2">
                <svg className="icon bg-primary-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-3 mr-2">
                <svg className="icon bg-primary-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 2:</span>Doloremque laudantium, totam error.</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-3 mr-2">
                <svg className="icon bg-primary-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
            </li>
            <li className="d-flex py-2">
              <div className="icon-round icon-round-xs bg-primary-3 mr-2">
                <svg className="icon bg-primary-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z"
                  fill="#212529" />
                </svg>

              </div>
              <span>
                <span className="font-weight-bold">Lesson 4:</span>Totam rem aperiam, eaque ipsa.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
      </React.Fragment>
    );
  }
}

export default HomeFeaturedCourses;
