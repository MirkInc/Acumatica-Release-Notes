# MIRK.Customizations Release Notes

Comparison: `2026.02.12` to `2026.04.28`  
Acumatica build: `25.201.0213`

## Summary

The 2026.04.28 package is a functional expansion of the 2026.02.12 MIRK customizations. The compiled `MIRK.Customizations.dll` increased from 583,680 bytes to 827,904 bytes and contains new features for cash-basis conversion, work-order labor calendar scheduling, DocuSign automation, and expanded equipment sale/purchase financial tracking.

## New Features

### MIRK Cash Conversion

- Added new screen `MIRK5010 - MIRK Cash Conversion`.
- Added a processing workflow for released AR payments, prepayments, and refunds that need MIRK cash-basis conversion.
- Added support for converting AR adjustment lines and AR payment charge transaction lines into cash-basis GL entries.
- Added tracking flags so converted AR adjustments and surcharge/charge lines are not processed repeatedly.
- Added a new setup flag, `Is MIRK Cash Conversion Enabled`, to control whether the cash conversion process is active.

### Work Order Labor Calendar

- Added new screen `MIRK9000` backed by `MIRKWorkOrderLaborCalendarGraph`.
- Adds a weekly labor calendar using SchedulerPro assets.
- Supports filtering by employee and week start date.
- Normalizes the selected week to Sunday.
- Displays work-order labor as calendar events grouped by employee.
- Adds a drill-through action to open the related work order from the calendar.

### DocuSign / E-Sign Enhancements

- Added DocuSign recipient support for `In-Person Signer`.
- Added `Host Name` handling and validation for in-person signer recipients.
- Added DocuSign autoplace tab configuration under MIRK setup.
- Seeds default DocuSign autoplace field definitions during customization setup.
- Applies configured DocuSign tabs to envelopes using anchor-based placement.
- Adds completed-envelope summary attachment behavior for DocuSign documents.

### Equipment Sale and Purchase Tracking

- Expanded equipment records with sale and purchase financial tracking fields, including sale price, sale date, sale paid-in-full status, invoiced sale price, invoice reference, customer, purchase bill reference, purchase paid-in-full status, invoice date, purchase amount, capitalized cost, and migration/lock flags.
- Added actions on equipment maintenance for updating sale details, updating purchase details, migrating sale/purchase fields, locking purchase details, and viewing linked customer/order/invoice records.
- Added logic to update equipment sale metrics from AR invoices and released AR payments.
- Added invoice projection support for showing AR invoice activity related to equipment.
- Added equipment financial summary fields for work-order billing, parts, labor, service charges, addons, collected revenue, total expense, and profit/loss.

### Equipment and Work Order UI Enhancements

- Expanded `NVRT2010` equipment screen customizations with:
  - Equipment sale information
  - Purchase information
  - Office notes
  - Secondary and tertiary meter sections
  - Work order history
  - Financial summary sections for rental billing, equipment sale, miscellaneous billing, work-order billing, expenses, and profit/loss
  - Equipment cross-reference grid
  - Update work orders equipment dialog
- Expanded MIRK equipment screens `MIRK1000` and `MIRK2010`.
- Added screen files for `IN405000`, `SM202510`, `MIRK5010`, and `MIRK9000`.

### Purchasing Enhancements

- Added part number fields to PO and receipt lines.
- Added equipment manual link / part number support across PO line and PO receipt line DAC extensions.
- Updated PO order and PO receipt entry extensions to carry the new equipment/part information.

### Approval and Release Processing

- Reworked AR and SO invoice approval extensions from the previous shared approval base into dedicated implementations.
- Expanded AP and AR approval log entries with created-by, created-date, and screen metadata.
- Added AP release and AR release process extensions.
- Added release/update handling around AR payments and equipment sale metrics.

### Common / Setup Cleanup

- Consolidated module-specific message classes into a shared `MIRK.Customizations.Common.Messages` class.
- Extended MIRK setup caching to include the new cash conversion flag.
- Added validation for DocuSign autoplace configuration.

## Database / Schema Additions

New project schema columns found in the 2026.04.28 package:

- `ARAdjust.UsrMIRKCashConverted`
- `ARPaymentChargeTran.UsrMIRKCashConverted`
- `ESignRecipient.UsrMIRKInPersonHostName`
- `APTran.UsrMIRKPartNbr`
- `POLine.UsrMIRKPartNbr`
- `POReceiptLine.UsrMIRKPartNbr`
- `FSEquipment.UsrMIRKCapitalizedCost`
- `FSEquipment.UsrMIRKCreatedThroughPO`
- `FSEquipment.UsrMIRKCustomerID`
- `FSEquipment.UsrMIRKExpenseAdjustmentLocked`
- `FSEquipment.UsrMIRKIncomeAdjustmentLocked`
- `FSEquipment.UsrMIRKPurchDataMigrated`
- `FSEquipment.UsrMIRKPurchDocType`
- `FSEquipment.UsrMIRKPurchInvAmt`
- `FSEquipment.UsrMIRKPurchInvDate`
- `FSEquipment.UsrMIRKPurchLocked`
- `FSEquipment.UsrMIRKPurchPaidDate`
- `FSEquipment.UsrMIRKPurchPaidInFull`
- `FSEquipment.UsrMIRKPurchRefNbr`
- `FSEquipment.UsrMIRKSaleDataMigrated`
- `FSEquipment.UsrMIRKSaleDate`
- `FSEquipment.UsrMIRKSalePaidInFull`
- `FSEquipment.UsrMIRKSalePrice`
- `FSEquipment.UsrMIRKSalePriceInvoice`
- `FSEquipment.UsrMIRKSOInvoiceDocType`
- `FSEquipment.UsrMIRKSOInvoiceNbr`

## Package File Changes

Added package files:

- `screens\IN\IN405000\extensions\IN405000_MIRK.ts`
- `screens\MI\MIRK5010\MIRK5010.html`
- `screens\MI\MIRK5010\MIRK5010.ts`
- `screens\MI\MIRK9000\MIRK9000.html`
- `screens\MI\MIRK9000\MIRK9000.scss`
- `screens\MI\MIRK9000\MIRK9000.ts`
- `screens\MI\MIRK9000\view-models.ts`
- `screens\MI\MIRK9000\schedulerpro.stockholm.css`
- `screens\MI\MIRK9000\fonts\fa-solid-900.ttf`
- `screens\MI\MIRK9000\fonts\fa-solid-900.woff2`
- `screens\SM\SM202510\extensions\SM202510_MIRK.ts`

No package files were removed.

## DLL Comparison Notes

The 2026.04.28 DLL decompilation shows:

- 26 new C# files/classes.
- 8 old module-specific message/base files removed or consolidated.
- 70 changed existing C# files.
- Net decompiled code delta of approximately 7,982 insertions and 2,387 deletions.

Major new DLL components:

- `MIRK.Customizations.CB.MIRKCashConversionProcess`
- `MIRK.Customizations.CB.MIRKCBDocument`
- `MIRK.Customizations.NVRTWorkOrders.LaborCalendar.*`
- `MIRK.Customizations.ESign.WikiFileMaintenance_DocuSignSummaryExt`
- `MIRK.Customizations.ESign.MIRKESignAutoPlaceField`
- `MIRK.Customizations.ESign.ESignRecipientExt`
- `MIRK.Customizations.AR.MIRKEquipmentSaleMetricsUpdater`
- `MIRK.Customizations.Projections.MIRKEquipmentARInvoiceProjection`
- `MIRK.Customizations.Projections.MIRKARPaymentWithActivity`
- `MIRK.Customizations.AP.MIRKAPReleaseProcessExt`
- `MIRK.Customizations.AR.MIRKARReleaseProcessExt`
