update:
	git pull
	npm run build
	rm -rf /var/www/html/*
	cp -r ~/ok/dist/* /var/www/html