import {RESTDataSource} from '@apollo/datasource-rest'
class GetUserApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://localhost:8001/";
    }
   
    async getUserInfor ()  {
        const result = await this.get(`test/`)
        return  result.results
    }
    async getUserInforByName (userName) {
        return await this.post(
            `getUserInforByName`,
            {body: {userName}},
        )
    }
    async deleteUserInforById (id) {
        return await this.delete(
            `deleteUserInforById/${encodeURIComponent(id)}`
        )
    }
}
export default GetUserApi