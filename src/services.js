import { CREATE_CART_URL, COMMERCE_PUB_API, COMMERCE_URL, ADD_CART_URL} from "./constants";

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
                   console.log(json);
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