import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

export const Dropdown = styled.div`
    position: absolute;
    z-index: 100;
    right: 2px;
    width: auto;
    height: auto;
    min-width: 256px;
    padding: 8px 0;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #9e9e9e;
    
                                width: 500px;
                                padding: 16px;
                                
    ${props => props.css}
`;

export const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    outline: none;
    cursor: pointer;
    
                                width: 500px;
                                padding: 16px;
    ${props => props.css}
`;

export const DropdownLink = styled.a`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
    text-decoration: none;
    color: #616161;
    ${props => props.css}
    
    &:hover {
        background: #f5f5f5;
    }
    
    &>span {
        padding-left: 8px;
    }
    
    &>i {  
        color: #616161;
    }
`;

class IconDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.closeDropdown();
    }
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown,
    });
  }

  closeDropdown() {
    this.setState({
      showDropdown: false,
    });
  }

  render() {
    const { icon, options } = this.props;
    return (
      <DropdownContainer>
        <Button
          type="button"
          buttonClass="btn link"
          onClick={this.toggleDropdown}
        >

          <i className="material-icons">{icon}</i>
        </Button>
        {
          this.state.showDropdown ?
            <div ref={this.setWrapperRef}>
              <Dropdown>
                {
                  options.map((option, item) => (
                    <DropdownLink
                      onClick={option.action}
                      key={item.toString()}
                    >
                      {option.text}
                    </DropdownLink>))
                }
              </Dropdown>
            </div> : null
        }

      </DropdownContainer>
    );
  }
}

IconDropdown.defaultProps = {
  icon: '',
  options: [],
};

IconDropdown.propTypes = {
  icon: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})),
};

export default IconDropdown;
