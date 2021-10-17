paper.pdf: *.tex
	pdflatex main
	bibtex main > /dev/null
	pdflatex main > /dev/null
	pdflatex main > /dev/null

clean:
	rm -f *.log *.aux *.pdf *.bbl *.blg *.out
