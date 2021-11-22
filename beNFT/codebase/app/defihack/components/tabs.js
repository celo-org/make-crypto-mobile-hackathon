import React, { Component } from "react"
import PropTypes from 'prop-types'
import Tab from "./tab"

export default class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
        active: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            activeTab: props.active
        }
    }

    onClickTabItem = (tab) => {
        if (this.props.root === false) {
            this.props.router.push('/?active=' + tab)
        } else {
            this.setState({ activeTab: tab })
        }
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children
            },
            state: {
                activeTab
            }
        } = this

        return (
            <div>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined
                        return child.props.children
                    })}
                </div>
                <ol className="tabs flex justify-around content-center">
                    {children.map((child) => {
                        const { icon, label } = child.props

                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                icon={icon}
                                label={label}
                                onClick={onClickTabItem}
                            />
                        )
                    })}
                </ol>
            </div>
        )
    }
}