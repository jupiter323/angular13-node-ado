const azdev = require("azure-devops-node-api");
const axios = require("axios");

let orgUrl = "https://dev.azure.com/erichufnagle";
let token = `2mxggdb6lqnk66mdbl2qvjph4t3ckunixemrnkhs2mdfyzszez2q`;

let authHandler = azdev.getPersonalAccessTokenHandler(token);
let connection = new azdev.WebApi(orgUrl, authHandler);

let vstsWI = connection.getWorkItemTrackingApi();
let authToken = Buffer.from(`:${token}`, 'utf8').toString('base64');

// Retrieve all WorkItems from the ADO.
exports.findAll = async (req, res) => {
  let tag = req.query.tag
  try {
    let result = []
    async function WIQLquery() {
      let teamC = { project: "test", projectId: "", team: "", teamId: "" };
      let query = `Select  [System.Parent] From WorkItems ${tag ? "Where [System.Tags] Contains '" + tag + "'" : ''}`
      let wiqls = { query };
      let queryResult = await (await vstsWI).queryByWiql(wiqls, teamC);
      for (let workItem of queryResult.workItems) {

        let itemDetail = (await axios.get(workItem.url, {
          headers: {
            'Authorization': `Basic ${authToken}`
          }
        })).data;
        result.push({ id: workItem.id, title: itemDetail.fields['System.Title'], workItemType: itemDetail.fields['System.WorkItemType']})
      }
    }

    await WIQLquery();
    res.send(result);
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Items."
    });
  };
};

// Find a single Item with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    let result = []
    async function WIQLquery() {
      let teamC = { project: "test", projectId: "", team: "", teamId: "" };
      let query = `Select  [System.Title] From WorkItems Where [System.Id] = ${id}`
      let wiqls = { query };
      let queryResult = await (await vstsWI).queryByWiql(wiqls, teamC);
      for (let workItem of queryResult.workItems) {

        let itemDetail = (await axios.get(workItem.url, {
          headers: {
            'Authorization': `Basic ${authToken}`
          }
        })).data;
        result = { id: workItem.id, title: itemDetail.fields['System.Title'], workItemType: itemDetail.fields['System.WorkItemType'] }
      }
    }

    await WIQLquery();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || `Some error occurred while retrieving Item id = ${id}.`
    });
  };
};


// Update a item by the id in the request
exports.update = async (req, res) => {
  const url = `${orgUrl}/test/_apis/wit/workitems/${req.params.id}?bypassRules=true&api-version=4.1`
  const title = req.body.title

  const reqBody = [
    {
      "op": "add",
      "path": "/fields/System.Title",
      "value": title
    }
  ]
  try {

    let itemDetail = (await axios.patch(url, reqBody, {
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json-patch+json',
      }
    })).data


    res.send({
      newItem: { id: itemDetail.id, title: itemDetail.fields['System.Title'], workItemType: itemDetail.fields['System.WorkItemType']},
      message: "Item was updated successfully."
    });

  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};
