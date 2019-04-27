const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');
// router.get('/', async (req, res, next) => {
//     try {
//         const tests = Test.findAll(); 
//         res.send(tests);
//     } catch (err) {
//         next(err);
//     }
// });

router.get('/', async (req, res, next) => {
    try {
      const tests = await Test.findAll();
      res.send(tests);
    } catch (error) {
      next(error);
    }
  });

router.get('/:id', async (req, res, next) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            res.send(test);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/student/:studentId', async (req, res, next) => {


//creating a new test and, on that test, we're setting the student id

    try {
        const student = await Student.findById(req.params.studentId);
        const test = await Test.create(req.body);

        // let studentTest = await test.setStudent(student);

        await test.update({studentId: +req.params.studentId});

        res.status(201).send(test);
      } catch (err) {
        next(err);
      }

    //   const { subject, grade } = req.body;
    //   const studentId = req.params.studentId;
    //   const studentTest = await Test.create( { subject, grade, studentId});

    //   res.status(201).send(studentTest);

    // console.log('TEST =>', Object.keys(Object.getPrototypeOf(test)));
    // console.log(chalk.cyan('#'.repeat(40)));

    // req.params.id
    // const testsThatHaveStudents = await Test.findAll(
    //     {
    //         include: [{model: 'Student'}]
    //     })

    // if (Tests.req.params.id === testsThatHaveStudents) {
    //     console.log('truth');
    // }
    // console.log(testsThatHaveStudents);
});

router.delete('/:id', async (req, res, next) => {
    try {
        await Test.destroy( 
            { where: 
                { id: req.params.id
                }
            });
        res.status(204).send()
    } catch (error) {
        next(error);
    }
})


module.exports = router;
