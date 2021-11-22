import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { HeartIcon as HeartActive, SearchIcon as SearchActive, HomeIcon as HomeActive, UserIcon as UserActive } from '@heroicons/react/solid'
import { HeartIcon, SearchIcon, HomeIcon, UserIcon } from '@heroicons/react/outline'
export default class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    onClick = () => {
        const { label, onClick } = this.props
        onClick(label)
    }

    renderSwitch(param, activeTab) {
        switch (param) {
            case "Home":
                return (activeTab === param) ? <HomeActive className="h-6 w-6 text-white"/> : <HomeIcon className="h-6 w-6 text-white"/>
                case "Search":
                return (activeTab === param) ? <SearchActive className="h-6 w-6 text-white"/> : <SearchIcon className="h-6 w-6 text-white"/>
            case "Favorites":
                return (activeTab === param) ? <HeartActive className="h-6 w-6 text-white"/> : <HeartIcon className="h-6 w-6 text-white"/>
            case "Profile":
                return (activeTab === param) ? <UserActive className="h-6 w-6 text-white"/> : <UserIcon className="h-6 w-6 text-white"/>
        }
    }

    render() {
        const {
            onClick,
            props: {
                activeTab,
                icon,
                active,
                label
            }
        } = this

        let className = 'tab-list-item'

        if (activeTab === label) {
            className += ' tab-list-active'
        }

        

        return (
            <li
                className={className + " pt-2"}
                onClick={onClick}
            >
                {this.renderSwitch(label, activeTab)}
            </li>
        )
    }
}