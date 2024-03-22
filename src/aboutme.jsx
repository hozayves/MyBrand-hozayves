function AboutMe() {
  return (
    <>
      <p
        data-aos="fade-right"
        data-aos-easing="ease-in-out"
        data-aos-delay="50"
        data-aos-offset="100"
      >
        Hi! My name is Yves, I'm a front-end developer on a journey that kicked
        off just over a year ago. Self-taught and committed to continuous
        improvement, I bring autonomy and problem-solving skills to development.
        Beyond the screen, my passion for film photography has shaped my
        approach to design, appreciating the nuances of layout and color
        schemes, much like framing the perfect shot. Excited to contribute and
        grow in a dynamic environment, bringing freshness and dedication to your
        projects by giving me the opportunity to collaborate and learn. Let's
        create something amazing together!
      </p>
      <div
        className="aboutme-profile"
        data-aos="fade-left"
        data-aos-easing="ease-in-out"
        data-aos-delay="100"
      >
        <img src="./images/profile.jpg" alt="" />
      </div>
    </>
  );
}
const aboutmeContainer = document.querySelector(".aboutme-about");

ReactDOM.render(<AboutMe />, aboutmeContainer);
