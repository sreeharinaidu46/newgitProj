const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/auth")

const Issue = require("../models/Issue")
const Book = require("../models/book");
const Return = require("../models/Datatime");

const Renew = require("../models/Renew")
const moment = require("moment");
// const issue = require("../models/issue");
const AvgReturn = require("../models/AvgReturn");
const MostFrequent = require("../models/MostFrequent");

const AvgDate = require("../models/AverageDate");
const student = require("../models/student");
// const AverageDate = require("../models/AverageDate");






router.post("/issueRequest", async(req, res) => {


        const { accession_no, title, author, publisher, year, userId, bookId, userBranch, userName, isRecom, copies } = req.body;

        const currentDate = new Date();
        const avgret = await AvgReturn.findOne({ year: currentDate.getFullYear(), month: currentDate.getMonth() });
        if (!avgret) {
            const newdata = await new AvgReturn({
                year: currentDate.getFullYear(),
                month: currentDate.getMonth(),
                counts: 1
            })

            await newdata.save();
        } else {
            avgret.counts += 1;


            await avgret.save();
        }

        const studentdata = await student.findOne({ _id: userId })

        studentdata.taken += 1;
        await studentdata.save();


        const mostFreq = await MostFrequent.findOne({ accession_no: accession_no });
        if (!mostFreq) {
            const newmf = await new MostFrequent({
                accession_no,
                title,
                author,
                bookId,
                publisher,
                countBooks: 1

            })

            await newmf.save();
        } else {
            mostFreq.countBooks += 1;
            await mostFreq.save();
        }
        const Modbook = await Book.findOne({ _id: bookId })
        Modbook.copies -= 1;
        await Modbook.save();

        const book = await new Issue({
            accession_no,
            title,
            author,
            publisher,
            year,
            userId,
            bookId,
            userBranch,
            userName,
            isRecom,
            copies
        })
        await book.save();
        const datas = await Issue.find({});
        res.json(datas);

    })
    //newly
router.get("/getList", (req, res) => {
    Datatime.find()
        .then((lists) => {
            res.json(lists);
        })
        .catch((err) => {
            console.log(err);
        });

})

router.get("/issuedBook", requireLogin, (req, res) => {

    Issue.find({ userId: req.user._id })
        .then((admins) => {
            res.json(admins);
        })
        .catch((err) => {
            console.log(err);
        });
})

router.get("/allIssuedBook", (req, res) => {

    setTimeout(async() => {
        const issues = await Issue.find({});

        res.json(issues);
    }, 1000);
})


router.get("/allIssueRequest", (req, res) => {

    Issue.find()
        .then(admins => {
            res.json(admins);
        })
        .catch((err) => {
            console.log(err);
        });
})


router.post("/issuedBookDelete", async(req, res) => {



    const { postId } = req.body;

    try {
        //await Issue.findOneAndDelete({ bookId: req.body.postId });
        const book = await Issue.findOne({ bookId: postId });
        // const date=await Date.findOne({issuedAt:book.issuedAt.slice(0,10)});
        // if(date)

        book.isRecom = true;
        await book.save();
        res.send("you successfully return the book")

    } catch (error) {
        console.log(error);
    }


})

router.put("/issueRenewedByAdmin", async(req, res) => {
    try {

        //const issue = await Issue.findOne({ bookId: req.body.bookId, userId: req.body.userId });
        //console.log(issue);




        const date = new Date();
        const issue = await Issue.findOne({ bookId: req.body.bookId, userId: req.body.userId });

        const { accession_no, title, author, publisher, year, userId, bookId, userBranch, userName, isRecom, copies } = issue;


        const issu = await new Renew({
            accession_no,
            title,
            author,
            publisher,
            year,
            userId,
            bookId,
            userBranch,
            userName,
            isRecom,
            copies
        })
        await issu.save();
        issue.createdAt = date;
        issue.return_Count += 1;
        await issue.save();



        const datas = await Issue.find({});
        res.json(datas);
    } catch (error) {
        console.log(error.message)
    }

})



router.post("/issuedReqAccept", async(req, res) => {


    const { bookId, postId } = req.body;

    try {
        const issue = await Issue.findOne({ _id: bookId })
        const book = await Book.findOne({ _id: postId })
        const data = await Datatime.findOne({ date: moment(issue.createdAt).format("YYYY-MM-DD") });

        if (data == null) {
            const datas = Datatime({
                date: moment(issue.createdAt).format("YYYY-MM-DD"),
                issued: 1,
                returned: 0
            });
            datas.save();
        } else {

            data.issued += 1;
            data.save();
        }

        await book.save();
        issue.isIssue = true
        await issue.save()
        res.send('issue Delivered Successfully')
    } catch (error) {

        return res.status(400).json({ message: error });

    }

});

router.post("/issueReqDelete", async(req, res) => {

    try {
        const issue = await Issue.findOne({ _id: req.body.postId });

        if (issue) {
            if (req.body.key) {
                const data = await Datatime.findOne({ date: moment(issue.createdAt).format("YYYY-MM-DD") });
                if (data == null) {
                    const datas = {
                        date: moment(issue.createdAt).format("YYYY-MM-DD"),
                        issued: 0,
                        returned: 1,
                    }
                    datas.save();
                } else {
                    data.returned += 1;
                    data.save();
                }

            }


        }

        const book = await Book.findOne({ _id: req.body.bookId })


        if (issue) {
            book.copies += 1;
            book.save();

        }
        await Issue.findOneAndDelete({ _id: req.body.postId });



        res.send("you successfully return the book")

    } catch (error) {
        console.log(error);
    }


})

router.post("/issueReturnedAdmin", async(req, res) => {
    try {

        const issue = await Issue.findOne({ bookId: req.body.bookId, userId: req.body.userId });
        const avDate = await AvgDate.findOne({ title: issue.title });
        if (!avDate) {
            const newAvg = await AvgDate({

                title: issue.title,
                average: 1,
                author: issue.author,
                publisher: issue.publisher,
                countss: 1
            })
            await newAvg.save();
        } else {

            //         var today = moment(new Date());
            // var end = moment(result); // another date

            // dayDiff = days;
            var date = moment(new Date());
            var start = moment(issue.createdAt);
            var duration = moment.duration(date.diff(start));

            var days = Math.floor(duration.asDays());
            avDate.average += days + 1;

            // avDate.average = Math.ceil((avDate.average + (days + 1 / avDate.countss)) / 2);
            avDate.countss += 1;

            await avDate.save();

        }

        const { accession_no, title, author, publisher, year, userId, bookId, userBranch, userName, isRecom, copies } = issue;


        const issu = await new Return({
            accession_no,
            title,
            author,
            publisher,
            year,
            userId,
            bookId,
            userBranch,
            userName,
            copies,
            return_Date: new Date()
        })
        await issu.save();

        // const
        await Issue.findOneAndDelete({ bookId: req.body.bookId, userId: req.body.userId });
        const book = await Book.findOne({ _id: req.body.bookId })
        book.copies += 1;
        await book.save()

        const studentdata = await student.findOne({ _id: userId })

        studentdata.taken -= 1;

        // console.log(studentdata);
        await studentdata.save();
        const datas = await Issue.find({});
        res.json(datas);
    } catch (error) {
        console.log(error.message);
    }
})




router.post("/issuedBook", async(req, res) => {

    const postId = req.body.postId
    try {
        const book = await Book.findOne({ _id: postId })

        book.isIssue = true
        await book.save()
        res.send('book issued Successfully')
    } catch (error) {

        return res.status(400).json({ message: error });

    }

});

router.post("/singleIssuedBook", async(req, res) => {

    const postId = req.body.postId

    try {
        const book = await Book.findOne({ _id: postId });


        res.json(book)

    } catch (error) {

        return res.status(400).json({ message: error });

    }

});

router.get("/getReturns", async(req, res) => {

    await Return.find({}, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).json({ message: err });
        }
    })
})

router.get("/getRenews", async(req, res) => {

    await Renew.find({}, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).json({ message: err });
        }
    })
})

// /api/issues/getReturns


router.get("/getAvgDay", async(req, res) => {
    await AvgDate.find({}, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).json(err.message);
        }
    })

})

router.get("/avgMonths", async(req, res) => {
    try {
        const data = await AvgReturn.find({}).sort({ counts: -1 }).limit(1);

        res.json(data);
    } catch (error) {
        res.status(400).json(error.message);

    }
})

router.get("/freqBook", async(req, res) => {
    try {
        const data = await MostFrequent.find({}).sort({ countBooks: -1 }).limit(1);

        res.json(data);
    } catch (error) {
        res.status(400).json(error.message);

    }
})



module.exports = router;