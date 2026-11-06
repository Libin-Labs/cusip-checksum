import { validateCusip } from '@lp-labs/cusip-checksum';
if (!validateCusip('037833100')) throw new Error('CUSIP');
// @ts-expect-error invalid argument must be rejected by declarations
validateCusip(123);
