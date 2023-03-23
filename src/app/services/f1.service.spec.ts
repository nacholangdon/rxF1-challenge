import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DriverStandingsParam, F1Service, SeasonParam } from './f1.service';

import { Race } from '../models/race';
import { Driver } from '../models/driver';
import { RaceTable } from '../models/race-table';
import { RaceResponse } from '../models/race-response';
import { SeasonResponse } from '../models/season-response';
import { DriverTable } from '../models/driver-table';
import { DriversResponse } from '../models/drivers-response';
import { DriverStandingsResponse } from '../models/driver-standings-response';
import { DriverStandings } from '../models/driver-standings';
import { StandingsTable } from '../models/standings-table';
import { StandingsList } from '../models/standings-list';
import { Status } from '../models/status';
import { FinishingStatusResponse } from '../models/finishing-status-response';
import { StatusTable } from '../models/status-table';

describe('F1Service', () => {
  let service: F1Service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(F1Service);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getSeasons', () => {
    it('should return expected data', () => {
      const expectedData1: SeasonResponse = {
        MRData: {
          RaceTable: {} as RaceTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };
      const expectedData2: SeasonResponse = {
        MRData: {
          RaceTable: {} as RaceTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };
      const expectedData3: SeasonResponse = {
        MRData: {
          RaceTable: {} as RaceTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };
      const expectedData4: SeasonResponse = {
        MRData: {
          RaceTable: {} as RaceTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };
      const expectedData5: SeasonResponse = {
        MRData: {
          RaceTable: {} as RaceTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };

      service.getSeasons().subscribe(data => {
        const response = Object.keys(data);
        expect(response.length).toEqual(5);
        expect(response).toEqual(['2018', '2019', '2020', '2021', '2022']);
      });

      const testRequest1 = httpTestingController.expectOne('http://ergast.com/api/f1/2018.json');
      const testRequest2 = httpTestingController.expectOne('http://ergast.com/api/f1/2019.json');
      const testRequest3 = httpTestingController.expectOne('http://ergast.com/api/f1/2020.json');
      const testRequest4 = httpTestingController.expectOne('http://ergast.com/api/f1/2021.json');
      const testRequest5 = httpTestingController.expectOne('http://ergast.com/api/f1/2022.json');

      testRequest1.flush(expectedData1);
      testRequest2.flush(expectedData2);
      testRequest3.flush(expectedData3);
      testRequest4.flush(expectedData4);
      testRequest5.flush(expectedData5);
    });

    it('should use GET to retrieve data', () => {
      service.getSeasons().subscribe();

      const testRequest1 = httpTestingController.expectOne('http://ergast.com/api/f1/2018.json');
      const testRequest2 = httpTestingController.expectOne('http://ergast.com/api/f1/2019.json');
      const testRequest3 = httpTestingController.expectOne('http://ergast.com/api/f1/2020.json');
      const testRequest4 = httpTestingController.expectOne('http://ergast.com/api/f1/2021.json');
      const testRequest5 = httpTestingController.expectOne('http://ergast.com/api/f1/2022.json');

      expect(testRequest1.request.method).toEqual('GET');
      expect(testRequest2.request.method).toEqual('GET');
      expect(testRequest3.request.method).toEqual('GET');
      expect(testRequest4.request.method).toEqual('GET');
      expect(testRequest5.request.method).toEqual('GET');

    });
  });

  describe('#getRacesPerSeason', () => {
    it('should return expected data', () => {
      const params: SeasonParam = {
        season: '2020',
        offset: 0,
        limit: 10
      };

      const response: SeasonResponse = {
        MRData: {
          RaceTable: {
            Races: []
          } as RaceTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };

      const expectedData: Race[] = [];

      service.getRacesPerSeason(params).subscribe(data => {
        expect(data).toEqual(expectedData);
        expect(data.length).toEqual(0);
      });

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020.json?limit=10&offset=0');

      testRequest.flush(response);
    });

    it('should use GET to retrieve data', () => {
      const params: SeasonParam = {
        season: '2020',
        offset: 0,
        limit: 10
      };
      service.getRacesPerSeason(params).subscribe();

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020.json?limit=10&offset=0');

      expect(testRequest.request.method).toEqual('GET');
    });
  });

  describe('#getRace', () => {
    it('should return expected data', () => {
      const year = '2020';
      const round = '1';

      const response: RaceResponse = {
        MRData: {
          RaceTable: {
            Races: [{}]
          } as RaceTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };

      const expectedData: Race = {} as Race;

      service.getRace(year, round).subscribe(data => {
        expect(data).toEqual(expectedData);
      });

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/1/results.json');

      testRequest.flush(response);
    });

    it('should use GET to retrieve data', () => {
      const year = '2020';
      const round = '1';

      service.getRace(year, round).subscribe();

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/1/results.json');

      expect(testRequest.request.method).toEqual('GET');
    });
  });

  describe('#getDriversPerSeason', () => {
    it('should return expected data', () => {
      const params: SeasonParam = {
        season: '2020',
        offset: 0,
        limit: 10
      };

      const seasonResponse: DriversResponse = {
        MRData: {
          DriverTable: {
            Drivers: []
          } as DriverTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };

      const expectedData: Driver[] = [];

      service.getDriversPerSeason(params).subscribe(data => {
        expect(data).toEqual(expectedData);
        expect(data.length).toEqual(0);
      });

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/drivers.json?limit=10&offset=0');

      testRequest.flush(seasonResponse);
    });

    it('should use GET to retrieve data', () => {
      const params: SeasonParam = {
        season: '2020',
        offset: 0,
        limit: 10
      };

      service.getDriversPerSeason(params).subscribe();

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/drivers.json?limit=10&offset=0');

      expect(testRequest.request.method).toEqual('GET');
    });
  });

  describe('#getDriverStandingsPerSeason', () => {
    it('should return expected data', () => {
      const params: DriverStandingsParam = {
        season: '2020',
        round: '1',
        offset: 0,
        limit: 10
      };

      const driverStandingsResponse: DriverStandingsResponse = {
        MRData: {
          StandingsTable: {
            StandingsLists: [{
              DriverStandings: [] as DriverStandings[]
            }],
            round: '',
            season: ''
          } as StandingsTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };

      const expectedData: DriverStandings[] = [];

      service.getDriverStandingsPerSeason(params).subscribe(data => {
        expect(data).toEqual(expectedData);
        expect(data.length).toEqual(0);
      });

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/1/driverStandings.json?limit=10&offset=0');

      testRequest.flush(driverStandingsResponse);
    });

    it('should use GET to retrieve data', () => {
      const params: DriverStandingsParam = {
        season: '2020',
        round: '1',
        offset: 0,
        limit: 10
      };

      service.getDriverStandingsPerSeason(params).subscribe();

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/1/driverStandings.json?limit=10&offset=0');

      expect(testRequest.request.method).toEqual('GET');
    });
  });

  describe('#getFinishingStatusPerRace', () => {
    it('should return expected data', () => {
      const season = '2020';
      const round = '1';

      const finishingStatusResponse: FinishingStatusResponse = {
        MRData: {
          StatusTable: {
            Status: []
          } as StatusTable,
          season: '',
          limit: '',
          offset: '',
          series: '',
          total: '',
          url: '',
          xmlns: ''
        }
      };

      const expectedData: Status[] = [];

      service.getFinishingStatusPerRace(season, round).subscribe(data => {
        expect(data).toEqual(expectedData);
        expect(data.length).toEqual(0);
      });

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/1/status.json');

      testRequest.flush(finishingStatusResponse);
    });

    it('should use GET to retrieve data', () => {
      const season = '2020';
      const round = '1';

      service.getFinishingStatusPerRace(season, round).subscribe();

      const testRequest = httpTestingController.expectOne('http://ergast.com/api/f1/2020/1/status.json');

      expect(testRequest.request.method).toEqual('GET');
    });
  });
});
