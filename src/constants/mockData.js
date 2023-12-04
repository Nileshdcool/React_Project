export const data = {
  jobLines: [
    { id: 'newJobs', title: 'NEW JOBS' },
    { id: 'createdJobs', title: 'CREATED JOBS' },
    { id: 'stagedJobs', title: 'STAGED JOBS' },
    { id: 'activeJobs', title: 'ACTIVE JOBS' },
  ],
  jobs: [
    {
      so: '92049152',
      queuePosition: 'newJobs',
      revisionNumber: null,
      status: 'WAITING',
      units: {
        scheduled: 14,
        completed: 0,
      },
      workData: {
        wo: '8430956',
        customer: 'GREAT SOUTHERN TECHNOLOGIES',
        description: 'RTW-10,BRN',
        startDate: '04/25/2020',
        completitionDate: '05/09/2020',
      },
    },
    {
      so: '92049154',
      queuePosition: 'newJobs',
      revisionNumber: null,
      status: 'DWGS REL',
      units: {
        scheduled: 13,
        completed: 0,
      },
      workData: {
        wo: '8430959',
        customer: 'LUMMUS TECHNOLOGY INC',
        description: 'PLSFFR-60M. BRN OPP 9206750',
        startDate: '05/09/2020',
        completitionDate: '05/23/2020',
      },
    },
    {
      so: '92049140',
      queuePosition: 'newJobs',
      revisionNumber: 2,
      status: 'ALLOCATED',
      units: {
        scheduled: 12,
        completed: 0,
      },
      workData: {
        wo: '8430952',
        customer: 'TECHNIP USA INC',
        description: 'COOLSTAR-15-ARIA G-1021A, G-1021B',
        startDate: '04/11/2020',
        completitionDate: '04/25/2020',
      },
    },
    {
      so: '92049129',
      queuePosition: 'createdJobs',
      revisionNumber: null,
      units: {
        scheduled: 24,
        completed: 0,
      },
      workData: {
        wo: '8430922',
        customer: 'VALERO REFINING',
        description: 'COOLSTAR-14-ARIA, BRN 9198614',
        startDate: '01/28/2020',
        completitionDate: '02/12/2020',
      },
    },
    {
      so: '92049156',
      queuePosition: 'createdJobs',
      revisionNumber: null,
      units: {
        scheduled: 18,
        completed: 0,
      },
      workData: {
        wo: '8430932',
        customer: 'JOHN ZINK INTERNATIONAL',
        description: 'PLSFFG-45M, BRN',
        startDate: '02/24/2020',
        completitionDate: '03/14/2020',
      },
    },
    {
      so: '92049141',
      queuePosition: 'createdJobs',
      revisionNumber: null,
      units: {
        scheduled: 16,
        completed: 0,
      },
      workData: {
        wo: '8430946',
        customer: 'JOHN ZINK ASIA-PACIFIC',
        description: 'PLSFFG-45 BURNER',
        startDate: '03/28/2020',
        completitionDate: '04/11/2020',
      },
    },
    {
      so: '92049117',
      queuePosition: 'stagedJobs',
      revisionNumber: 1,
      units: {
        scheduled: 17,
        completed: 0,
      },
      workData: {
        wo: '8430890',
        customer: 'LINDE ENENGINEERING',
        description: 'COOLSTAR-19-ARIA,BRN',
        startDate: '12/02/2019',
        completitionDate: '12/30/2019',
      },
    },
    {
      so: '92049118',
      queuePosition: 'stagedJobs',
      revisionNumber: null,
      units: {
        scheduled: 28,
        completed: 0,
      },
      workData: {
        wo: '8430897',
        customer: 'TTSJV WLL',
        description: 'LPMW-4,BRN',
        startDate: '12/30/2019',
        completitionDate: '01/14/2020',
      },
    },
    {
      so: '92049149',
      queuePosition: 'activeJobs',
      revisionNumber: 3,
      status: 'IN-PROGRESS',
      units: {
        scheduled: 12,
        completed: 9,
      },
      workData: {
        wo: '8430885',
        customer: 'KELLOGG BROWN & ROOT',
        description: 'COOLSTAR-18,BRN',
        startDate: '10/20/2019',
        completitionDate: '11/04/2019',
      },
    },
  ],
};

export const jobDetailsData = {
  so: '92049140',
  queuePosition: 'newJobs',
  revisionNumber: 2,
  status: 'ALLOCATED',
  units: {
    scheduled: 12,
    completed: 0,
  },
  wo: '8430952',
  customer: 'TECHNIP USA INC',
  description: 'COOLSTAR-15-ARIA G-1021A, G-1021B',
  startDate: '04/11/2020',
  completitionDate: '04/25/2020',
};

export const modalDialogData = {
  open: true,
  headerText: 'Changing job stage',
  bodyText: 'You change the stage of the job. Are you want to save changes?',
  buttonsNames: {
    confirmButtonText: 'SUBMIT',
    cancelButtonText: 'CANCEL',
  },
};
