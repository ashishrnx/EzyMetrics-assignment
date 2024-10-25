const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

// Generate CSV report
exports.generateCSV = async (metrics, res) => {
  const filePath = 'reports/metrics_report.csv';

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'averageProductPrice', title: 'Average Product Price' },
      { id: 'mostDemandingCategory', title: 'Most Demanding Category' },
      { id: 'topRatedProducts', title: 'Top-Rated Products' },
      { id: 'customerLocationBreakdown', title: 'Customer Location Breakdown' },
    ],
  });

  const csvData = [
    {
      averageProductPrice: metrics.averageProductPrice,
      mostDemandingCategory: `${metrics.mostDemandingCategory.category} (${metrics.mostDemandingCategory.count} products)`,
      topRatedProducts: metrics.topRatedProducts.map(p => `${p.title} (${p.rating.rate} stars)`).join(', '),
      customerLocationBreakdown: Object.entries(metrics.customerLocationBreakdown)
        .map(([city, count]) => `${city}: ${count}`)
        .join(', '),
    }
  ];

  await csvWriter.writeRecords(csvData);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=metrics_report.csv');
  fs.createReadStream(filePath).pipe(res);
};
