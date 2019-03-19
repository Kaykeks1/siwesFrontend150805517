import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Dropdown, DropdownContainer } from '../IconDropdown';

class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
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
    const { text, dropDownCss } = this.props;
    return (
      <DropdownContainer>
        <button
          // type="button"
          // buttonClass="btn"
          onClick={this.toggleDropdown}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>{text}</span>
          <i className="material-icons">arrow_drop_down</i>
        </button>
        {
          this.state.showDropdown ?
            <div ref={this.setWrapperRef}>
              <Dropdown>{this.props.children}</Dropdown>
            </div> : null

        }
      </DropdownContainer>
    );
  }
}

FilterComponent.defaultProps = {
  children: '',
  text: '',
  // css: '',
  dropDownCss: '',
};

FilterComponent.propTypes = {
  text: PropTypes.string,
  // css: PropTypes.string,
  dropDownCss: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

export default FilterComponent;
