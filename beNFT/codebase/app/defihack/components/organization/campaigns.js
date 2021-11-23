import React, { Component } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import Campaign from '../campaign'

export default function Campaigns(props) {
    props.campaigns.map((campaign) => {
        console.log(campaign)
    })

    return (
        <div>
            <h3 className="font-sans text-white pl-6 text-2xl pt-5 font-semibold">{props.active ? "Active Campaigns" : "Closed Campaings"}</h3>
            <ScrollContainer className="scroll-container">
                <ul className="flex gap-4 px-6 py-3">
                    {props.campaigns.map((campaign, idx) => {
                        return (
                            <Campaign image={campaign.image} name={campaign.name} key={idx}></Campaign>
                        )
                    })}
                </ul>
            </ScrollContainer>
        </div>
    )
}