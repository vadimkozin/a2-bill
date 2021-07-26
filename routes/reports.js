const express = require('express')
const fs = require('fs')
const config = require('config')
const reportsRouter = express.Router()
const errorHandler = require('../utils/error-handler')
const reportHelper = require('../utils/report-helper')
const auth = require('../middleware/auth.middleware')

const FILE_TO_DESCRIPTION_MAP = {
  '^\\d{4}_\\d{2}\\.zip$': 'Счета и расшифровки клиентам в pdf-формате', // 2021_06.zip
  '^\\d{4}_\\d{2}\\.xlsx$': 'Книга продаж и акт взаиморасчёта с МТС', // 2021_06.xlsx
  '^\\d{4}_\\d{2}__loc\\.xlsx$': 'Итоги по местной связи', // 2021_06__loc.xlsx
}

reportsRouter.use(auth)

// (GET) localhost:5000/api/reports --> ["2021","2022", ...]
reportsRouter.route('/').get(async (req, res) => {
  try {
    const result = await fs.promises.readdir(config.path_reports, {
      withFileTypes: true,
    })
    const files = result.filter((d) => d.isFile()).map((d) => d.name)
    res.status(200).json(reportHelper.getYears({ files }).sort())
  } catch (e) {
    errorHandler(res, e)
  }
})

// (GET) localhost:5000/api/reports/2021 --> ["2021_05","2021_06", ...]
reportsRouter.route('/:year').get(async (req, res) => {
  const { year } = req.params
  try {
    const result = await fs.promises.readdir(config.path_reports, {
      withFileTypes: true,
    })
    const files = result.filter((d) => d.isFile()).map((d) => d.name)
    const months = reportHelper.getMonths({ files, year })

    if (months.length === 0) throw new Error(`Нет отчётов за ${year} год`)

    res.status(200).json(reportHelper.getMonths({ files, year }))
  } catch (e) {
    errorHandler(res, e)
  }
})

// (GET) localhost:5000/api/reports/2021/2021_06 --> ["2021_06.xlsx","2021_06.zip","2021_06__loc.xlsx"]
reportsRouter.route('/:year/:month').get(async (req, res) => {
  const { year, month } = req.params
  try {
    const result = await fs.promises.readdir(config.path_reports, {
      withFileTypes: true,
    })

    const files = result.filter((d) => d.isFile()).map((d) => d.name)
    res
      .status(200)
      .json(prepareFilesForSending(reportHelper.getFiles({ files, month })))
  } catch (e) {
    errorHandler(res, e)
  }
})

const getDescription = (file) => {
  for (const [k, v] of Object.entries(FILE_TO_DESCRIPTION_MAP)) {
    if (new RegExp(k).test(file)) {
      return v
    }
  }

  return ''
}

const prepareFilesForSending = (files) =>
  files.map((file) => ({ name: file, desc: getDescription(file) }))

module.exports = reportsRouter
