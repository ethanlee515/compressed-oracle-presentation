paper.pdf: *.tex
	xelatex main
	bibtex main > /dev/null
	xelatex main > /dev/null
	xelatex main > /dev/null

clean:
	rm -f *.log *.aux *.pdf *.bbl *.blg *.out
