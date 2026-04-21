import { Component } from '@angular/core';
import { EventService } from 'src/Services/evt.service';
import { MemberService } from 'src/Services/member.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  NbMembers: number = 0;
  NbArticles: number = 0;
  NbEvents: number = 0;
  NbTools: number = 0;
  NbTeachers: number = 0;
  NbStudents: number = 0;
  tabNom: string[] = [];
  tabEvt: number[] = [];
  
  // Line chart
  chartDataLine: ChartDataset[] = [
    {
      // Member names
      label: 'Events by Lieu',
      data: []
    }
  ];
  chartLabelsLine: string[] = [];
  chartOptionsLine: ChartOptions = {
    responsive: true,};

  // Doughnut chart (events by lieu)
  chartDataDoughnut: ChartDataset[] = [
    {
      label: 'Events by Lieu',
      data: []
    }
  ];
  chartLabelsDoughnut: string[] = [];
  chartOptionsDoughnut: ChartOptions = {
    responsive: true,
  };

  // Pie chart (teachers vs students)
  chartDataPie: ChartDataset[] = [
    {
      data: []
    }
  ];
  chartLabelsPie: string[] = ['Teacher', 'Student'];
  chartOptionsPie: ChartOptions = {
    responsive: true,
  };

  constructor(private MS: MemberService, private ES: EventService) {

    // MEMBERS
    this.MS.GetAllMembers().subscribe((data) => {
      this.NbMembers = data.length;
      this.NbTeachers = data.filter(m => m.Type === 'Teacher').length;
      this.NbStudents = data.filter(m => m.Type === 'Student').length;

      this.chartDataPie = [
        {
          data: [this.NbTeachers, this.NbStudents]
        }
      ];

      // Extract member names for line chart
      for (let member of data) {
        this.tabNom.push(member.Name);
        this.tabEvt.push(member.tab_Events.length);
      }

      this.chartLabelsLine = this.tabNom;
      this.chartDataLine = [
        {
          label: 'Events by Member',
          data: this.tabEvt
        }
      ];
    });

    // EVENTS
    this.ES.GetAllEvents().subscribe((data) => {
      this.NbEvents = data.length;

      // Count events by lieu
      const countByLieu: { [key: string]: number } = {};

      data.forEach(evt => {
        const lieu = evt.Lieu;

        if (countByLieu[lieu]) {
          // If the lieu already exists, increment the count
          countByLieu[lieu]++;
        } else {
          // If the lieu does not exist, initialize the count
          countByLieu[lieu] = 1;
        }
      });

      // Convert to chart format
      this.chartLabelsDoughnut = Object.keys(countByLieu);

      this.chartDataDoughnut = [
        {
          label: 'Events by Lieu',
          data: Object.values(countByLieu)
        }
      ];
    });
  }
}