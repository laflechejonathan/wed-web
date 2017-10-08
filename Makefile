default: publish

publish: website
	aws s3 cp --recursive --acl public-read website s3://kojo2018.jlf-hacks.com
	touch publish
