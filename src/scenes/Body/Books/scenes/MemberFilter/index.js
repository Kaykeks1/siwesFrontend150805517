import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class MemberFilter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedOption: null,
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption }, () => {
            this.props.handleClick(this.state.selectedOption)
        });
      }
    render(){
        const {
            members,
        } = this.props;
        const options = members.map(member => ({value: member.id, label: `${member.firstName} (${member.lastName})`}));
        return (
            <div className="form-row">
                <div className="form-row-item" style={{ width: '100%' }}>
                    <Select 
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        placeholder="Book"
                    />
                </div>
            </div>
        );
    }
};

MemberFilter.defaultProps = {
  handleSubmit: () => {
  },
  is: {
    fetching: false,
    ok: false,
    error: false,
  },
  trucks: [],
};

MemberFilter.propTypes = {
  handleSubmit: PropTypes.func,
  trucks: PropTypes.arrayOf(PropTypes.shape({})),
  is: PropTypes.shape({
    fetching: PropTypes.bool,
    ok: PropTypes.bool,
    error: PropTypes.bool,
  }),
};

export default MemberFilter;
