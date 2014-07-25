/** @jsx React.DOM */
;(function (window, React, $, undefined) {

  var $main = document.querySelector('.main');

  var Shop = React.createClass({
    getData: function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function (data) {
          this.setState({data: data});
        }.bind(this),
        error: function (err) {
          console.error(err);
        }.bind(this)
      });
    },

    componentDidMount: function () {
      this.getData();
    },

    getInitialState: function () {
      return {
        data: [],
        filter: '',
        inStockOnly: false
      };
    },

    filterData: function (e) {
      this.setState({filter: e.target.value});
    },

    inStockFilter: function (e) {
      this.setState({inStockOnly: e.target.checked});
    },

    render: function () {
      return (
        <div className="box">
          <Search filter={this.filterData} value={this.state.filter} inStockOnly={this.state.inStockOnly} inStockChange={this.inStockFilter} />
          <List products={this.state.data} value={this.state.filter} inStockOnly={this.state.inStockOnly} />
        </div>
      );
    }
  });

  var Search = React.createClass({
    render: function() {
      return (
        <div className="box__search">
          <label className="box__label">
            <h4>Поиск</h4>
            <input onChange={this.props.filter} ref="filterTextInput" className="input" placeholder="Поиск..." value={this.props.value} />
          </label>
          <label className="box__label">
            <input onChange={this.props.inStockChange} type="checkbox" className="checkbox" ref="inStockOnly" value={this.props.inStockOnly} />
            <span className="box__label-title">В наличии</span>
          </label>
        </div>
      );
    }
  });

  var List = React.createClass({
    render: function () {

      var items = this.props.products.map(function (elem) {
          
            if ((this.props.value && elem.name.indexOf(this.props.value) !== -1) && this.props.inStockOnly === false || 
                ((this.props.value && elem.name.indexOf(this.props.value) !== -1) && (this.props.inStockOnly === elem.stocked && elem.stocked === true)) || 
                (!this.props.value.length && this.props.inStockOnly === elem.stocked && elem.stocked === true) ||
                (!this.props.value.length && this.props.inStockOnly === false)) {
              return (<Item name={elem.name} price={elem.price} stocked={elem.stocked} />);
            }
          
          }.bind(this));

      return (
        <div className="box__list">
          {items}
        </div>
      );
    }
  });

  var Item = React.createClass({
    render: function () {
      var stocked = (this.props.stocked) ? 'box__item' : 'box__item box__item_stocked'; 
      return (
        <div className={stocked}>
          {this.props.name} - {this.props.price}
        </div>
      );
    }
  });



  React.renderComponent(<Shop url="catalog.json" />, $main);

}(window, window.React, window.jQuery));