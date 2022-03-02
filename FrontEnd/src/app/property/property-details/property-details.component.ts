import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { IPropertyBase } from 'src/app/model/ipropertypase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  propertyId:number ;
  property=new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route:ActivatedRoute,
              private router:Router,
              private housingService:HousingService) { }

  ngOnInit() {
    this.propertyId=Number(this.route.snapshot.params['id']);

    // get data from resolver
    this.route.data.subscribe(
      (data)=>{
        this.property=data['propRes']
      }
    );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/gallery/g1.png',
        medium: 'assets/images/gallery/g1.png',
        big: 'assets/images/gallery/g1.png',
      },
      {
        small: 'assets/images/gallery/g2.png',
        medium: 'assets/images/gallery/g2.png',
        big: 'assets/images/gallery/g2.png',
      },
      {
        small: 'assets/images/gallery/g3.png',
        medium: 'assets/images/gallery/g3.png',
        big: 'assets/images/gallery/g3.png',
      },
      {
        small: 'assets/images/gallery/g4.png',
        medium: 'assets/images/gallery/g4.png',
        big: 'assets/images/gallery/g4.png',
      },
      {
        small: 'assets/images/gallery/g5.png',
        medium: 'assets/images/gallery/g5.png',
        big: 'assets/images/gallery/g5.png',
      }
    ];
  }

}
