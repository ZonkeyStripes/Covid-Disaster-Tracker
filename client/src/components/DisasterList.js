import React, { Component, setState } from 'react';
import FAQ from './FAQ';

class DisasterList extends Component{

    constructor(props) {
        console.log(props.stateDisasters);

        super(props);
        this.state = {
            faqs: props.stateDisasters
        };
    }

    toggleFAQ = index => {
        this.setState({faqs: this.state.faqs.map((faq, i) => {
            if(i === index) {
                faq.open = !faq.open
            } else {
                faq.open = false;
            }
            return faq;
        })})
    }

    render() {
        return (
            <div className="sum">
                <div className="other">
                    {this.state.faqs.map((faq, i) => (
                    <FAQ faq={faq} key={i} index={i} toggleFAQ={this.toggleFAQ} />
                    ))}
                </div>
            </div>
        );
    }
}

export default DisasterList;
