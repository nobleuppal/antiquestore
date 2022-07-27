import { COMMERCE_PUB_API, COMMERCE_URL } from "./constants";

class CommerceService {
    async allDetails() {
        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(COMMERCE_URL, {
                    method: 'GET',
                    headers: new Headers({
                        'X-Authorization': COMMERCE_PUB_API, 
                    })
                });
    
                if(response.ok) {
                    const json = await response.json();
                    const details = json.data
                        .map(item => ({
                            title: item.name,
                            description: item.description,
                            price: item.price.formatted_with_code,
                            image: item.image.id,
                            inventory: item.inventory.available,
                            category: item.categories[0].name,
                        }));
                    success({response, details});
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