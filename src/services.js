import { CREATE_CART_URL, COMMERCE_PUB_API, COMMERCE_URL, ADD_CART_URL, GET_CART_URL, GET_TAX, TAX_API, TAX_SAND_API, GET_SAND_TAX} from "./constants";

class CommerceService {
    constructor() {
        this.cartIdentity = '';
    }

    async allDetails() {
        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(COMMERCE_URL, {
                    method: 'GET',
                    headers: new Headers({
                        'X-Authorization': COMMERCE_PUB_API, 
                    })
                });
                
                const responseCart = await fetch(CREATE_CART_URL, {
                    method: 'GET',
                    headers: new Headers({
                        'X-Authorization': COMMERCE_PUB_API, 
                    })
                });

                if(response.ok && responseCart.ok) {
                    const json = await response.json();
                    const jsonCart = await responseCart.json();

                    const details = json.data
                        .map(item => ({
                            title: item.name,
                            description: item.description,
                            price: item.price.formatted_with_code,
                            image: item.image.url,
                            imageName: item.image.filename,
                            Id: item.id,
                            inventory: item.inventory.available,
                            category: item.categories[0].name,
                        }));
                    const detailsCart = {cartId: jsonCart.id}
                     
                    this.cartIdentity = detailsCart.cartId;
                    success({response, details, detailsCart});
                }
                else {
                    failure({error: "Invalid http request"});
                }

            }
            catch(error) {
                failure(error);
            }    
        })
    }

    async addCart(itemId, itemQuantity) {
        const finalAddCartUrl = ADD_CART_URL.concat(this.cartIdentity);
        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(finalAddCartUrl, {
                    method: 'POST',
                    headers: new Headers({
                        'X-Authorization': COMMERCE_PUB_API, 
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                    }),
                    body: JSON.stringify({'id': itemId, 'quantity': itemQuantity}),
                });

                if(response.ok) {
                   const json = await response.json();
                   //console.log(json);
                   success({response, json});
                }
                else {
                   failure({error: "Invalid http request"});
                }
            }
            catch(error) {
                failure(error);
            }    
        })
    }

    async getCart() {
        const finalGetCartUrl = GET_CART_URL.concat(this.cartIdentity);

        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(finalGetCartUrl, {
                    method: 'GET',
                    headers: new Headers({
                        'X-Authorization': COMMERCE_PUB_API, 
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                    }),
                });

                if(response.ok) {
                   const json = await response.json();
                   //console.log(json);
                   success({response, json});
                }
                else {
                   failure({error: "Invalid http request"});
                }
            }
            catch(error) {
                failure(error);
            }    
        })
    }

    async updateCart(line_item_id, value) {
        const finalUpdateCartUrl = GET_CART_URL.concat(this.cartIdentity).concat('/items/').concat(line_item_id);

        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(finalUpdateCartUrl, {
                    method: 'PUT',
                    headers: new Headers({
                        'X-Authorization': COMMERCE_PUB_API, 
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                    }),
                    body: JSON.stringify({'quantity': value})
                });

                if(response.ok) {
                   const json = await response.json();
                   //console.log(json);
                   success({response, json});
                }
                else {
                   failure({error: "Invalid http request"});
                }
            }
            catch(error) {
                failure(error);
            }    
        })
    }

    async deleteCart(line_item_id) {
        const finalDeleteCartUrl = GET_CART_URL.concat(this.cartIdentity).concat('/items/').concat(line_item_id);

        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(finalDeleteCartUrl, {
                    method: 'DELETE',
                    headers: new Headers({
                        'X-Authorization': COMMERCE_PUB_API, 
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                    }),
                });

                if(response.ok) {
                   const json = await response.json();
                   //console.log(json);
                   success({response, json});
                }
                else {
                   failure({error: "Invalid http request"});
                }
            }
            catch(error) {
                failure(error);
            }    
        })
    }

    async addTax(country, shipping, amount) {
        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(GET_TAX, {
                    mode: 'no-cors',
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': `Bearer ${TAX_API}`, 
                        'Content-Type': "application/json",
                    }),
                    body: JSON.stringify({to_country: country, amount: amount, shipping: shipping}),
                });

                if(response.ok) {
                   const json = await response.json();
                   //console.log(json);
                   success({response, json});
                }
                else {
                   failure({error: "Invalid http request"});
                }
            }
            catch(error) {
                failure(error);
            }    
        })
    }
}

export default CommerceService;