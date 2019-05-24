package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Category;
import com.hrqueue.hrqueue.repositories.CategoryRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CategoryController {

    private final CategoryRepository categoryRepo;

    public CategoryController(CategoryRepository categoryRepo){
        this.categoryRepo = categoryRepo;
    }

    @GetMapping("/categories")
    public String categories(Model model) {
        Iterable<Category> categories = categoryRepo.findAll();
        int sizeOfArray = 0;
        for (Category category : categories) {
            sizeOfArray++;
        }
        model.addAttribute("category", new Category());
        model.addAttribute("allCategories", categoryRepo.findAll());
        return "categories/categories";
    }

    @PostMapping("/categories")
    public String categories(@RequestParam(name = "category") String categories){
        if (categories != ""){
            Category category = new Category();
            category.setCategory(categories);
            categoryRepo.save(category);
        }

//        System.out.println(categories);
        return "redirect:/categories";
    }

    @GetMapping("/categories/{category}/delete-prompt")
    public String deleteCategoryPrompt(@PathVariable String category, Model model){
        model.addAttribute("category", categoryRepo.findByCategory(category));
        return "categories/delete-prompt";
    }

    @GetMapping("/categories/{category}/delete")
    public String deleteCategory(@PathVariable String category){
        Category deleteCategory = categoryRepo.findByCategory(category);
        categoryRepo.delete(deleteCategory.getId());
        return "redirect:/categories";
    }
}
