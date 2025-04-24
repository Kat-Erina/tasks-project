import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string): string {
    const abbreviations: { [key: string]: string } = {
      'ადმინისტრაციის დეპარტამენტი': 'ადმინ.დეპ',
      'ფინანსების დეპარტამენტი': 'ფინ.დეპ',
      'გაყიდვები და მარკეტინგის დეპარტამენტი': 'მარკეტინგი',
      "ადამიანური რესურსების დეპარტამენტი":'ად.რეს.დეპ',
      "ლოჯოსტიკის დეპარტამენტი":"ლოჯისტიკა",
      "ტექნოლოგიების დეპარტამენტი":"ინფ.ტექ",
"მედიის დეპარტამენტი":'მედია'
      
    };
    return abbreviations[value] || value.slice(0, 6) + '...';
  }
}
