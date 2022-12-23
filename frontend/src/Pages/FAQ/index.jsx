import React, {useRef, useState} from "react"
import "./style.scss"
import Wrap from "../../Layouts/DefaultLayout";

const faqs = [
    {
        id: 1,
        header: "How do I volunteer at OMUT?",
        text: `Thank you for your interest in OMUT! We have a lot of volunteering where we would need your help. Attached is a volunteering form that you need to fill in first.`
    },
    {
        id: 2,
        header: "Where do I park?",
        text: ` The students&#39; parking lot is near the park. Staff parks in the underground parking. `
    },
    {
        id: 3,
        header: "What are the Cafe’s hours?",
        text: `The OMI cafe is open every day from 9 am to 10 pm. Breakfast hours are from 9 am to 12 pm, after 12 pm one can order anything from the main menu.`
    },
    {
        id: 4,
        header: "Where can I get some?",
        text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`
    },
    {
        id:5,
        header:"Is OMUT open to the general public?",
        text:"Yes, our cosy community is open to the general public. While our programs aim to impact students&#39; lives, our cafe, coworking area and volunteering programmes are open to the public.You should come any working day from 9 am to 5 pm and fill in the form."
    },
    {
        id:6,
        header:"How do I find out about upcoming events?",
        text:"Follow us on our social media pages :).",
    },
    {
        id:7,
        header:"Is OMUT currently hiring?",
        text:"We have a few open positions, all information you can find on our website in the section\n" +
            "&#39;Career&#39;"
    }
]
const FAQ = () => {
    const [active, setActive] = useState(null);
    const handleToggle = (index) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    }

    return (
        <section className="faq-container">
            <h1 className="faq-container_title">FAQ</h1>
            <div className="faq-container_content">
                <div className=" wrapper">
                    <div className="card-body">
                        {faqs.map((faq, index) => {
                            return (
                                <AccordionItem key={index} active={active} handleToggle={handleToggle} faq={faq}/>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

const AccordionItem = (props) => {
    const contentEl = useRef();
    const {handleToggle, active, faq} = props;
    const {header, id, text} = faq

    return (
        <React.Fragment>

            <div className="rc-accordion-card">
                <div className="rc-accordion-header">
                    <div className={`rc-accordion-toggle ${active === id ? 'active' : ''}`}
                         onClick={() => handleToggle(id)}>
                        <h5 className="rc-accordion-title">{header}</h5>
                        <i className="fa fa-chevron-down rc-accordion-icon"></i>
                    </div>
                </div>
                <div ref={contentEl} className={`rc-collapse ${active === id ? 'show' : ''}`} style={
                    active === id
                        ? {height: contentEl.current.scrollHeight}
                        : {height: "0px"}
                }>
                    <div className="rc-accordion-body">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Wrap(FAQ)