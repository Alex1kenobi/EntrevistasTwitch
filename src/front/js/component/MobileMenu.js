import React, { Component } from 'react'

import {Link} from 'react-router-dom'

import './MobileMenu.js';

export const MobileMenu = () => {


    state = {
        isOpen: false,
        isOpenTwo: false,
    }

    isDropDownOpenOne = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            isOpenTwo: false
        })
    }

    isDropDownOpenTwo = () => {
        this.setState({
            isOpen: false,
            isOpenTwo: !this.state.isOpenTwo
        })
    }

    const { isOpen, isOpenTwo } = this.state;

        return (
            <div>
                <div className={`mobile-menu ${this.props.toggleMenu ? 'mobile-menu-active' : ''}`}>
                    <ul className="mean-nav">
                        <li onClick={this.isDropDownOpenOne}>
                            {'Home'}
                            <i className="fa fa-angle-down"></i>
                        </li>

                            <ul>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/'}>
                                        {'Home Page 01'}
                                    </Link>
                                </li>
                            </ul>
                      
                    </ul>
                </div>
            </div>
        )
    }