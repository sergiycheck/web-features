import React, { Component } from 'react'

const PRODUCTS = [
  {id: '1',category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {id: '2',category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {id: '3',category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {id: '4',category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {id: '5',category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {id: '6',category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];



export default class FilterableProducts extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			filterText:'',
			isStockOnly:false,

			sortByName:'',
			sortByPrice:''
	 }

	 this.handleInputChange = this.handleInputChange.bind(this);
	 this.handleCheckedChange = this.handleCheckedChange.bind(this);

	 this.handleSortByNameParent = this.handleSortByNameParent.bind(this);
	 this.handleSortByPriceParent = this.handleSortByPriceParent.bind(this);

	 this.resetFilters = this.resetFilters.bind(this);
	}
	
	handleInputChange(event){
		this.setState((state)=>({
			filterText:event.target.value
		}))
	};
	handleCheckedChange(event){
		this.setState((state)=>({
			isStockOnly:event.target.checked
		}))
	}

	getSortingType(sortingType){
		if(sortingType===''){
			sortingType = 'asc';
		}else if(sortingType==='asc'){
			sortingType='desc';
		}else if(sortingType==='desc'){
			sortingType='asc';
		}
		return sortingType;
	}

	handleSortByNameParent(event){
		//console.log(this.state.sortByName);
		let sortingType = this.getSortingType(this.state.sortByName);

		this.setState((state)=>({
			sortByName:sortingType,
			sortByPrice:''
		}));
	}
	handleSortByPriceParent(event){
		//console.log(this.state.sortByPrice);
		let sortingType = this.getSortingType(this.state.sortByPrice);

		this.setState((state)=>({
			sortByPrice:sortingType,
			sortByName:''
		}));
	}
	resetFilters(event){
		this.setState((state)=>({
			sortByName:'',
			sortByPrice:''
		}))
	}
	

	render() {

		let products = PRODUCTS;

		function getNameUpperCase(elem){
			return String(elem).toUpperCase();
		}

		function stringComparer(name1,name2){
			name1 = getNameUpperCase(name1);
			name2 = getNameUpperCase(name2);

			if (name1 < name2) {
				return -1;
			}
			if (name1 > name2) {
				return 1;
			}
			return 0;
		}

		if(this.state.sortByName==='asc'){
			products = Array.from(products).sort((el1,el2)=>{
				return stringComparer(el1.name,el2.name);
			});
		}else if(this.state.sortByName==='desc'){
			products = Array.from(products).sort((el1,el2)=>{
				return stringComparer(el2.name,el1.name);
			});
		}

		function matchNum(elem){
			const regExp = /\d+\.+\d+/g;
			let matches = String(elem).match(regExp);
			if(matches && matches.length>0){
				return matches[0];
			}
			
		}

		function numComparer(price1Str,price2Str){
			let price1 = matchNum(price1Str);
			let price2 = matchNum(price2Str);
			return price1 - price2;
		}

		if(this.state.sortByPrice==='asc'){
			products = Array.from(products).sort((el1,el2)=>{
				return numComparer(el1.price,el2.price);
			});
		}else if (this.state.sortByPrice==='desc'){
			products = Array.from(products).sort((el1,el2)=>{
				return numComparer(el2.price,el1.price);
			});
		}


		return (
			<div className="row">
				<div className="table-container">
					
					<InputBar 
						filterText={this.state.filterText}
						isStockOnly={this.state.isStockOnly}
						handleChange={this.handleInputChange}
						handleCheckedChange={this.handleCheckedChange}
						></InputBar>

						<span onClick={this.resetFilters} 
							className="m-2 p-2 btn bg-secondary mx-auto">reset</span>

						<ProductsTable 
						products={products}
						filterText={this.state.filterText}
						isStockOnly={this.state.isStockOnly}
						handleSortName={this.handleSortByNameParent}
						handleSortPrice={this.handleSortByPriceParent}
						>

						</ProductsTable>

				</div>

			</div>
		)
	}
}


class InputBar extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 
		}

		this.handleInputValueChange = this.handleInputValueChange.bind(this);
		this.handleInputCheckedChange = this.handleInputCheckedChange.bind(this);
	}
	

	handleInputValueChange(event){
		this.props.handleChange(event);
	}
	handleInputCheckedChange(event){
		this.props.handleCheckedChange(event);
	}

	render() {
		const filterText = this.props.filterText;
		const isStockOnly = this.props.isStockOnly;

		return (
			<div>
				<form className="mb-3" action="">
					<input
						onChange={this.handleInputValueChange}
						value={filterText}
						className="form-control" type="text" placeholder="Search..."/>
					<p>
					<input
						onChange={this.handleInputCheckedChange}
						checked={isStockOnly} 
						className="m-3" type="checkbox" /><span>Show only products in stock</span>
					</p>
				
				</form>
			</div>
		)
	}
}



class ProductsTable extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			sortByNumClicked:false
		}

		this.handleSortByNumber = this.handleSortByNumber.bind(this);
		this.handleSortByName = this.handleSortByName.bind(this);
		this.handleSortByPrice = this.handleSortByPrice.bind(this);
	}

	handleSortByNumber(event){
		this.setState((state)=>({
			sortByNumClicked:!state.sortByNumClicked
		}));
	}
	
	handleSortByName(event){
		this.props.handleSortName(event);
	}
	handleSortByPrice(event){
		this.props.handleSortPrice(event);
	}


	render() {

		const filterText = this.props.filterText;
		const isStockOnly = this.props.isStockOnly;

		let products = this.props.products;
		const rows = [];
		let lastCategory = null;

		Array.from(products).forEach((product,index)=>{

			//console.log(filterText,product.name,product.name.indexOf(filterText));

			//remove products that aren't fit for filter
			if(isStockOnly && !product.stocked){
				return;
			}

			//filtering
			if(String(product.name)
					.toUpperCase()
					.indexOf(filterText.toUpperCase())!==-1 

				||product.price.indexOf(filterText)!==-1 

				||String(product.category)
					.toUpperCase()
					.indexOf(filterText.toUpperCase())!==-1
					){

				//push category row
				if(product.category!==lastCategory){
					rows.push(
						<CategoryRow key={product.category} category={product.category}></CategoryRow>
					);
				}
				//push product row
				rows.push(
					<ProductRow number={index+1} key={product.id} product={product} ></ProductRow>
				);
				lastCategory = product.category;

			}

		});
		
		if(this.state.sortByNumClicked){
			rows.reverse();
		}


		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th><span onClick={this.handleSortByNumber} >Number</span></th>
							<th><span onClick={this.handleSortByName} >Name</span></th>
							<th><span onClick={this.handleSortByPrice} >Price</span></th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		)
	}
}

class CategoryRow extends Component {
	render() {
		const category = this.props.category;
		return (
			<tr>
				<th>{category}</th>
			</tr>
		)
	}
}

class ProductRow extends Component {
	render() {
		const number = this.props.number;
		const product = this.props.product;

		const nameElement = !product.stocked?
			<span className="bg-info">{product.name}</span>
			:
			<span className="bg-light">{product.name}</span>;

		return (
			<tr>
				<th>{number}</th>
				<td>{nameElement}</td>
				<td>{product.price}</td>
			</tr>
		)
	}
}


