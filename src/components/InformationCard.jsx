import React, { Component } from 'react';

export class InformationCard extends Component {
    render() {
        const { title, desc, button } = this.props;
        if (!title || !desc || !button) return (
            <>
                <h3 style={{
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}>
                    Props em falta! InformationCard.
                </h3>
            </>
        );
        return (
            <>
                <div className={"information-card"}>
                    <span className={"title"}>{title}</span>
                    <br />
                    <span className={"desc"}>{desc}</span>
                    <br />
                    <button className={"button"}>
                        {button}
                    </button>
                </div>
            </>
        );
    }
}