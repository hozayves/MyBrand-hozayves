function Footer(){
    return (<>
        <h2 className="footer-heading">Learning, Living, Level Up.</h2>
        <div className="footer-social">
                <a href="#" target="_blank">
                    <img src="./images/instagram(1) 1.png" alt=""/>
                </a>
                <a href="https://twitter.com/hozayves" target="_blank">
                    <img src="./images/twitter 1.png" alt=""/>
                </a>
                <a href="https://www.linkedin.com/in/muhoza-yves-ab06a7133/" target="_blank">
                    <img src="./images/linkedin.png" alt=""/>
                </a>
                <a href="https://github.com/hozayves" target="_blank">
                    <img src="./images/github.png" alt=""/>
                </a>
            </div>
            <p class="footer-copyright">Design & Built by Yves Muhoza &#169; 2024</p>
    </>)
        
}
const app = document.querySelector(".footer")

ReactDOM.render(<Footer />, app)
