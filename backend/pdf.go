package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jung-kurt/gofpdf"
)
func generatePDF(c *gin.Context, portfolio *Portfolio) {

	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()

	// Name
	pdf.SetFont("Arial", "B", 20)
	pdf.Cell(0, 12, portfolio.Name)
	pdf.Ln(12)

	// Title
	pdf.SetFont("Arial", "", 16)
	pdf.Cell(0, 10, portfolio.Title)
	pdf.Ln(12)

	// Summary
	pdf.SetFont("Arial", "", 12)
	pdf.MultiCell(0, 8, portfolio.Summary, "", "", false)

	pdf.Ln(10)

	// Skills
	pdf.SetFont("Arial", "B", 14)
	pdf.Cell(0, 10, "Skills:")
	pdf.Ln(10)

	pdf.SetFont("Arial", "", 12)
	for _, skill := range portfolio.Skills {
		pdf.Cell(0, 8, "- "+skill)
		pdf.Ln(8)
	}

	c.Header("Content-Type", "application/pdf")
	c.Header("Content-Disposition", "attachment; filename=portfolio.pdf")

	_ = pdf.Output(c.Writer)
}