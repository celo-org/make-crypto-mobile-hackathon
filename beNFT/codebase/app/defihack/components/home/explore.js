import React, { Component } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

export default class Explore extends Component {
    render() {
        return (
            <div>
                <h3 className="font-sans text-white px-6 text-2xl font-semibold">Explore</h3>
                <ScrollContainer className="scroll-container">
                    <ul className="flex gap-2 px-6 py-3">
                        <li className="btn-tab btn-tab-active" id="cat1">All</li>
                        <li className="btn-tab" id="cat2">Art</li>
                        <li className="btn-tab" id="cat3">Photography</li>
                        <li className="btn-tab" id="cat4">Music</li>
                    </ul>
                </ScrollContainer>
            </div>
        )
    }
}