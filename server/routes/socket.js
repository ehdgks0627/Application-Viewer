import { io } from '../server';
import Application from '../models/Application';
import { ObjectId } from 'mongoose';

function titleToColumn(title) {
    switch(title)
    {
        case "질문 리스트":
            return "question";
        case "전공 실력":
            return "major";
        case "특이사항":
            return "special";
        case "답변":
            return "answer";
    }
}

export default function (socket) {
    socket.on('newAlert', (alertData) => {
        io.emit('newAlert', alertData);
    });
    socket.on('startTimer', (timerData) => {
        io.emit('startTimer', timerData);
    });
    socket.on('endTimer', (timerData) => {
        io.emit('endTimer', timerData);
    });
    socket.on('newItem', (itemData) => {
        Application.findById(itemData._id, function(err, application) {
            if(err) {
                console.log(err);
            } else {
                if(application)
                {
                    let column = titleToColumn(itemData.title);
                    let columnIndex = column + "Index";
                    let savedItemData = {key: application[columnIndex],
                        content: itemData.content};
                    application[columnIndex] += 1;
                    application[column].push(savedItemData);

                    application.save(function(err, data){
                        if(err) {
                            console.log(err);
                        } else {
                            itemData.key = savedItemData.key;
                            io.emit('newItem', itemData);
                        }
                    });
                }
                else
                {
                    console.log("Application not found with id " + itemData._id);
                }
            }
        });
    });
    socket.on('removeItem', (itemData) => {
        Application.findById(itemData._id, function(err, application) {
            if(err) {
                console.log(err);
            } else {
                if(application)
                {
                    let column = titleToColumn(itemData.title);
                    let index = application[column].findIndex((element) => {return element.key === itemData.key});
                    if(index === -1) {
                        console.log("Element not found with key " + itemData.key);
                    } else {
                        application[column].splice(index, 1);
                        application.save(function(err, data){
                            if(err) {
                                console.log(err);
                            } else {
                                io.emit('removeItem', itemData);
                            }
                        });
                    }
                }
                else
                {
                    console.log("Application not found with id " + itemData._id);
                }
            }
        });
    });
    socket.on('editItem', (itemData) => {
        let column = titleToColumn(itemData.title);
        let columnIndex = column + "Index";
        Application.findById(itemData._id, function(err, application) {
            if(err) {
                console.log(err);
            } else {
                if(application)
                {
                    let index = application[column].findIndex((element) => {return element.key === itemData.key});
                    if(index === -1) {
                        console.log("Element not found with key " + itemData.key);
                    } else {
                        application[column][index].content = itemData.content;
                        let query = {$set: {}};
                        query.$set[column] = application[column];
                        Application.findByIdAndUpdate(itemData._id, query, function(err, doc){
                            if(err) {
                                console.log(err);
                            }
                            io.emit('editItem', itemData);
                        });
                    }
                }
                else
                {
                    console.log("Application not found with id " + itemData._id);
                }
            }
        });
    });
}
