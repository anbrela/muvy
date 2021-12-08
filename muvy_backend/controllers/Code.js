const Code = require('../Models/Code');
const Generator = require("license-key-generator");



const newCode = async (req,res) => {

    const options = {
        type: "random", // default "random"
        length: 6, // default 16 
        split: "-", // default "-"
        splitStatus: false // default true
    }

    const {device, used, team, game, room} = req.body;
    let number = "";
    

    const randomCode = new Generator(options);
    await randomCode.get((error,code)=>{
        if(error) {
            return console.error(error);
        }
        number = code;
        console.log("numero:", number)


    })

    const newCode = new Code({
        number, device, used, team, game, room,
    });


    

    try {

        const codeSaved = await newCode.save();   
        res.status(200).json(codeSaved);
        console.log(codeSaved)


    }

    catch (err) {
        console.log(err);
    }
    


}

const getCode = async (req, res) => {
    const codes = await Code.find();
    res.json(codes)
}

let getBookmarkById = async (userId, bookmarkId) => {
    const bookmark = await Bookmark.findOne({
      _id: bookmarkId,
      userId: userId
    });
  
    if (!bookmark) {
      throw new NotFoundError(`Bookmark NOT_FOUND the userId: ${userId} AND id: ${bookmarkId}`);
    } else {
      return bookmark;
    }
  };


const getCodeByNumber = async (req, res) => {


    const code = await Code.findOne({number: req.params.number}); 
    
    if (!code) {
        res.status(404).json({message: "not found"});
    } else {
        res.status(200).json(code);

    }

  
}


const updateCodeById = async (req, res) => {
    const codeUpdated = await Code.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
  
    res.status(200).json(codeUpdated);
  };


module.exports = {
    newCode,
    getCode,
    getCodeByNumber,
    updateCodeById
};