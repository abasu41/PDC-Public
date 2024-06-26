#!/bin/bash
sudo rm -rf /var/www/html/pdc/*
sudo cp -r /home/ec2-user/PDC_Build/pdc/dist/* /var/www/html/pdc/
sudo rm -rf /var/www/html/data-dictionary
sudo cp -r /home/ec2-user/PDC_Build/pdc/documentation/prod /var/www/html/data-dictionary
sudo cp -r /home/ec2-user/PDC_Build/pdc/documentation/prod/publicapi-documentation /var/www/html/data-dictionary/
sudo cp /home/ec2-user/PDC_Build/pdc/documentation/prod/apidocumentation.html /var/www/html/data-dictionary/
sudo cp /home/ec2-user/PDC_Build/pdc/documentation/prod/styles/main.css /var/www/html/data-dictionary/styles/
sudo rm -rf /var/www/html/API_documentation
sudo cp -r /home/ec2-user/PDC_Build/pdc/API_documentation /var/www/html/
sudo rm -f /var/www/html/view_heatmap.html
sudo cp /home/ec2-user/PDC_Build/pdc/dist/assets/js/view_heatmap.html /var/www/html/
sudo cp /home/ec2-user/PDC_Build/pdc/dist/assets/data-folder/dataDownloadDocumentation.json /var/www/html/

sudo cp /home/ec2-user/PDC_Build/pdc/data-download-archival-folder/dataDownloadDocumentation.json /var/www/html
sudo cp /home/ec2-user/PDC_Build/pdc/data-download-archival-folder/UI_Screen_Shot_1.png  /var/www/html/pdc/assets
sudo cp /home/ec2-user/PDC_Build/pdc/data-download-archival-folder/UI_Screen_Shot_2.png  /var/www/html/pdc/assets
sudo cp /home/ec2-user/PDC_Build/pdc/data-download-archival-folder/UI_Screen_Shot_3.png  /var/www/html/pdc/assets
sudo cp /home/ec2-user/PDC_Build/pdc/data-download-archival-folder/data-download-1.png  /var/www/html/pdc/assets