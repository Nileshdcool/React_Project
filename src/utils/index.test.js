import React from 'react';
import data from '../constants/mockData';
import { filterJobsByParam } from './arrayFilters';
import { sortByExecutionOrder } from './sorting';

describe('-- Test Utils Functions', () => {
  it(' --> it should filter jobs by param newJobs', () => {
    const paramInArray = 'queuePosition';
    const comparableParam = 'newJobs';
    const result = [
      {
        id: '92049152',
        queuePosition: 'newJobs',
        revisionNumber: null,
        status: 'WAITING',
        units: {
          scheduled: 14,
          completed: 0,
        },
        workData: {
          workOrder: '8430956',
          customer: 'GREAT SOUTHERN TECHNOLOGIES',
          description: 'RTW-10,BRN',
          startDate: '04/25/2020',
          completitionDate: '05/09/2020',
        },
      },
      {
        id: '92049154',
        queuePosition: 'newJobs',
        revisionNumber: null,
        status: 'DWGS REL',
        units: {
          scheduled: 13,
          completed: 0,
        },
        workData: {
          workOrder: '8430959',
          customer: 'LUMMUS TECHNOLOGY INC',
          description: 'PLSFFR-60M. BRN OPP 9206750',
          startDate: '05/09/2020',
          completitionDate: '05/23/2020',
        },
      },
      {
        id: '92049140',
        queuePosition: 'newJobs',
        revisionNumber: 2,
        status: 'ALLOCATED',
        units: {
          scheduled: 12,
          completed: 0,
        },
        workData: {
          workOrder: '8430952',
          customer: 'TECHNIP USA INC',
          description: 'COOLSTAR-15-ARIA G-1021A, G-1021B',
          startDate: '04/11/2020',
          completitionDate: '04/25/2020',
        },
      },
    ];
    expect(filterJobsByParam(data.jobs, paramInArray, comparableParam)).toEqual(result);
  });
  it(' --> it should filter jobs by param createdJobs', () => {
    const paramInArray = 'queuePosition';
    const comparableParam = 'createdJobs';
    const result = [
      {
        id: '92049129',
        queuePosition: 'createdJobs',
        revisionNumber: null,
        units: {
          scheduled: 24,
          completed: 0,
        },
        workData: {
          workOrder: '8430922',
          customer: 'VALERO REFINING',
          description: 'COOLSTAR-14-ARIA, BRN 9198614',
          startDate: '01/28/2020',
          completitionDate: '02/12/2020',
        },
      },
      {
        id: '92049156',
        queuePosition: 'createdJobs',
        revisionNumber: null,
        units: {
          scheduled: 18,
          completed: 0,
        },
        workData: {
          workOrder: '8430932',
          customer: 'JOHN ZINK INTERNATIONAL',
          description: 'PLSFFG-45M, BRN',
          startDate: '02/24/2020',
          completitionDate: '03/14/2020',
        },
      },
      {
        id: '92049141',
        queuePosition: 'createdJobs',
        revisionNumber: null,
        units: {
          scheduled: 16,
          completed: 0,
        },
        workData: {
          workOrder: '8430946',
          customer: 'JOHN ZINK ASIA-PACIFIC',
          description: 'PLSFFG-45 BURNER',
          startDate: '03/28/2020',
          completitionDate: '04/11/2020',
        },
      },
    ];
    expect(filterJobsByParam(data.jobs, paramInArray, comparableParam)).toEqual(result);
  });
  it(' --> it should filter jobs by param id 92049118', () => {
    const paramInArray = 'so';
    const comparableParam = '92049118';
    const result = [
      {
        so: '92049118',
        queuePosition: 'stagedJobs',
        revisionNumber: null,
        units: {
          scheduled: 28,
          completed: 0,
        },
        workData: {
          workOrder: '8430897',
          customer: 'TTSJV WLL',
          description: 'LPMW-4,BRN',
          startDate: '12/30/2019',
          completitionDate: '01/14/2020',
        },
      },
    ];
    expect(filterJobsByParam(data.jobs, paramInArray, comparableParam)).toEqual(result);
  });
  it(' --> Array sorting right', () => {
    const array = [
      {
        id: '92049152',
        queuePosition: 'newJobs',
        revisionNumber: null,
        status: 'WAITING',
        executionOrder: 0,
        units: {
          scheduled: 14,
          completed: 0,
        },
        workData: {
          workOrder: '8430956',
          customer: 'GREAT SOUTHERN TECHNOLOGIES',
          description: 'RTW-10,BRN',
          startDate: '04/25/2020',
          completitionDate: '05/09/2020',
        },
      },
      {
        id: '92049154',
        queuePosition: 'newJobs',
        revisionNumber: null,
        status: 'DWGS REL',
        executionOrder: 0,
        units: {
          scheduled: 13,
          completed: 0,
        },
        workData: {
          workOrder: '8430959',
          customer: 'LUMMUS TECHNOLOGY INC',
          description: 'PLSFFR-60M. BRN OPP 9206750',
          startDate: '05/09/2020',
          completitionDate: '05/23/2020',
        },
      },
      {
        id: '92049140',
        queuePosition: 'newJobs',
        revisionNumber: 2,
        status: 'ALLOCATED',
        executionOrder: 0,
        units: {
          scheduled: 12,
          completed: 0,
        },
        workData: {
          workOrder: '8430952',
          customer: 'TECHNIP USA INC',
          description: 'COOLSTAR-15-ARIA G-1021A, G-1021B',
          startDate: '04/11/2020',
          completitionDate: '04/25/2020',
        },
      },
    ];
    const result = [
      {
        id: '92049140',
        queuePosition: 'newJobs',
        revisionNumber: 2,
        status: 'ALLOCATED',
        executionOrder: 0,
        units: {
          scheduled: 12,
          completed: 0,
        },
        workData: {
          workOrder: '8430952',
          customer: 'TECHNIP USA INC',
          description: 'COOLSTAR-15-ARIA G-1021A, G-1021B',
          startDate: '04/11/2020',
          completitionDate: '04/25/2020',
        },
      },
      {
        id: '92049152',
        queuePosition: 'newJobs',
        revisionNumber: null,
        status: 'WAITING',
        executionOrder: 0,
        units: {
          scheduled: 14,
          completed: 0,
        },
        workData: {
          workOrder: '8430956',
          customer: 'GREAT SOUTHERN TECHNOLOGIES',
          description: 'RTW-10,BRN',
          startDate: '04/25/2020',
          completitionDate: '05/09/2020',
        },
      },
      {
        id: '92049154',
        queuePosition: 'newJobs',
        revisionNumber: null,
        status: 'DWGS REL',
        executionOrder: 0,
        units: {
          scheduled: 13,
          completed: 0,
        },
        workData: {
          workOrder: '8430959',
          customer: 'LUMMUS TECHNOLOGY INC',
          description: 'PLSFFR-60M. BRN OPP 9206750',
          startDate: '05/09/2020',
          completitionDate: '05/23/2020',
        },
      },
    ];
    expect(sortByExecutionOrder(array)).toEqual(result);
  });
});
