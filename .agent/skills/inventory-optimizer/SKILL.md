# Skill: Inventory Optimizer (Supply Chain)

## Description
Protects the SME from capital loss by predicting stockouts, managing "Dead Stock," and automating the reordering process with suppliers.

## Capabilities
- **Demand Forecasting**: Analyze historical sales patterns to predict future stock needs.
- **Dead Stock Identification**: Flag items that haven't sold in 90+ days and suggest liquidation strategies (e.g., "Bundle with Product X").
- **Auto-Reorder**: Generate purchase orders (POs) when stock levels hit a pre-defined "Safety Threshold."
- **Lead Time Tracking**: Monitor supplier delivery times and adjust reorder points accordingly.
- **Shrinkage Analysis**: Compare sales vs. stock counts to identify potential loss or theft.

## Inputs
- `sales_history`: CSV or API feed of SKU-level sales.
- `current_inventory_levels`: Real-time stock counts.
- `supplier_list`: Lead times and minimum order quantities (MOQs).

## Logic
1. Calculate "Velocity" for every SKU (How fast is it selling?).
2. Factor in seasonality (e.g., higher demand for umbrellas in June).
3. Compute "Days of Cover" for each item.
4. Generate a "Critical Action List" (e.g., "Reorder SKU_992 today").
5. Output draft POs for the business owner to approve.

## Output
```json
{
  "critical_alerts": [
    { "sku": "BLUE_WIDGET", "reason": "Stockout predicted in 3 days" }
  ],
  "capital_optimization": {
    "dead_stock_value": 4500.00,
    "suggested_action": "20% discount clearance"
  },
  "pos_drafted": 3
}
```
