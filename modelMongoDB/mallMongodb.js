const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongodb");


class MallsMongodb {
    static getCollections() {
        const db = getDatabase();
        const malls = db.collection("malls");
        return malls;
    }
    
    static async addMalls(mall) {
        return this.getCollections().insertOne({
            ...mall,
        })
    }
    
    static async getNearest() {
        try {
            return this.getCollections().find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [-6.260708677108048, 106.78162263036307]
                        },
                        $maxDistance: 5000
                    }
                }
            })
            // return this.getCollections().find().toArray()
        } catch (error) {
            
        }
    }
}

module.exports = MallsMongodb;
