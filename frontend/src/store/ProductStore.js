import {makeAutoObservable} from "mobx"

export default class ProductStore {
    constructor() {
        this._categories = []
        this._brands= []
        this._colors= []
        this._products = []
        makeAutoObservable(this)
    }

    setCategories(categories){
        this._categories = categories
    }

    setBrands(brands){
        this._brands = brands
    }

    setColors(colors){
        this._colors = colors
    }

    setProducts(products){
        this._products = products
    }

    addQuestion(question){
        this._products.push(question)
    }

    get categories(){
        return this._categories
    }

    get brands(){
        return this._brands
    }

    get colors(){
        return this._colors
    }

    get products(){
        return this._products
    }
}