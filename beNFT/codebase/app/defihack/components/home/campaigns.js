import React, { Component } from 'react'
import pulmoCat from "../../assets/PulmoCat.png"
import felines from "../../assets/Felines.png"
import mindfull from "../../assets/Mindfull.png"
import ourCulture from "../../assets/OurCulture.png"
import ScrollContainer from 'react-indiana-drag-scroll'
import Campaign from '../campaign'

export default function Campaigns() {
    return (
        <div>
            <h3 className="font-sans text-white pl-6 text-2xl pt-5 font-semibold">Campaigns</h3>
            <ScrollContainer className="scroll-container">
                <ul className="flex gap-4 px-6 py-3">
                    <Campaign image={pulmoCat} name="Pulmo Cat"></Campaign>
                    <Campaign image={felines} name="Felines"></Campaign>
                    <Campaign image={mindfull} name="Mindfull"></Campaign>
                    <Campaign image={ourCulture} name="Our Culture"></Campaign>
                </ul>
            </ScrollContainer>
        </div>
    )
}