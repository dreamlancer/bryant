import React from 'react';

class ProductOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      inputValue: '',
      inputError: null,
    };
  }

  componentDidMount() {
    const { option, setEngraving, optionId } = this.props;
    if (option.name === 'Engraving') {
      setEngraving(optionId);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.inputError !== state.inputError) {
      return { inputError: props.inputError };
    }
    return {};
  }

  setActive = (index, option) => {
    const { optionId, setOptions, options } = this.props;
    const { active } = this.state;

    // add new will determine if
    // selected one is active will deselect it
    // otherwise it will select it
    const addNew = active !== index;

    this.setState({
      active: addNew ? index : null,
    });
    let price = 0;
    if (!addNew) {
      price = -option.price;
    } else if (active !== null) {
      price = option.price - options[active].price;
    } else {
      price = option.price;
    }

    const response = {
      optionObject: {
        [optionId]: addNew ? option.product_option_value_id : null,
      },
      price,
    };
    setOptions(response);
  };

  setInput = ({ target }) => {
    const { inputError } = this.state;
    const { optionId, setOptions, resetError, setEngravingTextId } = this.props;
    if (inputError) {
      resetError();
    }
    setEngravingTextId(optionId);
    const response = {
      optionObject: {
        [optionId]: target.value,
      },
      price: 0,
    };
    setOptions(response);
    this.setState({
      inputValue: target.value,
    });
  };

  render() {
    const { active, inputValue, inputError } = this.state;
    const { options, lang, text, optionType } = this.props;
    if (optionType === 'text') {
      return (
        <>
          <input type="text" onChange={this.setInput} value={inputValue} />
          {inputError && (
            <p className="error" style={{ marginTop: 10 }}>
              {inputError}
            </p>
          )}
        </>
      );
    }
    return (
      <React.Fragment>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => this.setActive(index, option)}
            className={`selection-box ${active === index ? 'active' : ''}`}
            title={option.name}
          >
            <div className="selection-box-title">{option.name}</div>
            <div className="selection-box-price">
              {option.price_formated === 0
                ? text.free[lang]
                  ? text.free[lang]
                  : text.free['en']
                : `+ ${option.price_formated}`}
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default ProductOptions;
