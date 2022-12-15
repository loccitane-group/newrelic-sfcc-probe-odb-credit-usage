# newrelic-sfcc-probe-odb-credit-usage
JS Script for NewRelic Probes to get Salesforce B2C Commerce Cloud On-Demand Sandboxes credit usage

<p align="center">
<img width="719" alt="image" src="https://user-images.githubusercontent.com/11783843/207866116-cb43e640-28a8-4b38-920d-f8e4ecded013.png">
</p>

## Install
On NewRelic, create a new Synthetic monitor with type `Endpoint availability Scripted API`, configure it to run on a regular basis (e.g. every day), then on `Write script` panel paste the code in `index.js` by inserting your SFCC contract start date on `contract_start_date` constant and the Sandbox API client id and secrets created on Account Manager.

## Usage
You can then create a new dashboard widget with the following NRQL query to display the remaining credit:
Please replace `XXXXXXXX` by the initial number of sandbox credit on your contract (you may ask this information to Salesforce support).

```sql
SELECT round(XXXXXXXX-latest(custom.totalMinutes)) as 'remaing credits' FROM SyntheticCheck ORDER BY timestamp DESC SINCE 365 days ago
```

Then choose a `Bullet` chart type and fill the `Limit` field with the initial number of sandbox credit on your contract.

*Note: If you have multiple monitor you can add a `WHERE` clause to specify the monitor previsouly created with its ID or name.*
